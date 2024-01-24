"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var handleRequest_exports = {};
__export(handleRequest_exports, {
  handleRequest: () => handleRequest
});
module.exports = __toCommonJS(handleRequest_exports);
var import_until = require("@open-draft/until");
var import_getResponse = require("./getResponse.js");
var import_onUnhandledRequest = require("./request/onUnhandledRequest.js");
var import_readResponseCookies = require("./request/readResponseCookies.js");
function handleRequest(request, requestId, handlers, options, emitter, handleRequestOptions) {
  return __async(this, null, function* () {
    var _a, _b, _c, _d, _e, _f;
    emitter.emit("request:start", { request, requestId });
    if (request.headers.get("x-msw-intention") === "bypass") {
      emitter.emit("request:end", { request, requestId });
      (_a = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _a.call(handleRequestOptions, request);
      return;
    }
    const lookupResult = yield (0, import_until.until)(() => {
      return (0, import_getResponse.getResponse)(
        request,
        handlers,
        handleRequestOptions == null ? void 0 : handleRequestOptions.resolutionContext
      );
    });
    if (lookupResult.error) {
      emitter.emit("unhandledException", {
        error: lookupResult.error,
        request,
        requestId
      });
      throw lookupResult.error;
    }
    if (!lookupResult.data) {
      yield (0, import_onUnhandledRequest.onUnhandledRequest)(request, handlers, options.onUnhandledRequest);
      emitter.emit("request:unhandled", { request, requestId });
      emitter.emit("request:end", { request, requestId });
      (_b = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _b.call(handleRequestOptions, request);
      return;
    }
    const { response } = lookupResult.data;
    if (!response) {
      emitter.emit("request:end", { request, requestId });
      (_c = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _c.call(handleRequestOptions, request);
      return;
    }
    if (response.status === 302 && response.headers.get("x-msw-intention") === "passthrough") {
      emitter.emit("request:end", { request, requestId });
      (_d = handleRequestOptions == null ? void 0 : handleRequestOptions.onPassthroughResponse) == null ? void 0 : _d.call(handleRequestOptions, request);
      return;
    }
    (0, import_readResponseCookies.readResponseCookies)(request, response);
    emitter.emit("request:match", { request, requestId });
    const requiredLookupResult = lookupResult.data;
    const transformedResponse = ((_e = handleRequestOptions == null ? void 0 : handleRequestOptions.transformResponse) == null ? void 0 : _e.call(handleRequestOptions, response)) || response;
    (_f = handleRequestOptions == null ? void 0 : handleRequestOptions.onMockedResponse) == null ? void 0 : _f.call(
      handleRequestOptions,
      transformedResponse,
      requiredLookupResult
    );
    emitter.emit("request:end", { request, requestId });
    return transformedResponse;
  });
}
