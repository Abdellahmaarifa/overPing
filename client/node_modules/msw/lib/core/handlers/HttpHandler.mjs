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
import { devUtils } from '../utils/internal/devUtils.mjs';
import { isStringEqual } from '../utils/internal/isStringEqual.mjs';
import { getStatusCodeColor } from '../utils/logging/getStatusCodeColor.mjs';
import { getTimestamp } from '../utils/logging/getTimestamp.mjs';
import { serializeRequest } from '../utils/logging/serializeRequest.mjs';
import { serializeResponse } from '../utils/logging/serializeResponse.mjs';
import {
  matchRequestUrl
} from '../utils/matching/matchRequestUrl.mjs';
import { getPublicUrlFromRequest } from '../utils/request/getPublicUrlFromRequest.mjs';
import { getAllRequestCookies } from '../utils/request/getRequestCookies.mjs';
import { cleanUrl, getSearchParams } from '../utils/url/cleanUrl.mjs';
import {
  RequestHandler
} from './RequestHandler.mjs';
var HttpMethods = /* @__PURE__ */ ((HttpMethods2) => {
  HttpMethods2["HEAD"] = "HEAD";
  HttpMethods2["GET"] = "GET";
  HttpMethods2["POST"] = "POST";
  HttpMethods2["PUT"] = "PUT";
  HttpMethods2["PATCH"] = "PATCH";
  HttpMethods2["OPTIONS"] = "OPTIONS";
  HttpMethods2["DELETE"] = "DELETE";
  return HttpMethods2;
})(HttpMethods || {});
class HttpHandler extends RequestHandler {
  constructor(method, path, resolver, options) {
    super({
      info: {
        header: `${method} ${path}`,
        path,
        method
      },
      resolver,
      options
    });
    this.checkRedundantQueryParameters();
  }
  checkRedundantQueryParameters() {
    const { method, path } = this.info;
    if (path instanceof RegExp) {
      return;
    }
    const url = cleanUrl(path);
    if (url === path) {
      return;
    }
    const searchParams = getSearchParams(path);
    const queryParams = [];
    searchParams.forEach((_, paramName) => {
      queryParams.push(paramName);
    });
    devUtils.warn(
      `Found a redundant usage of query parameters in the request handler URL for "${method} ${path}". Please match against a path instead and access query parameters in the response resolver function using "req.url.searchParams".`
    );
  }
  parse(args) {
    return __async(this, null, function* () {
      var _a;
      const url = new URL(args.request.url);
      const match = matchRequestUrl(
        url,
        this.info.path,
        (_a = args.resolutionContext) == null ? void 0 : _a.baseUrl
      );
      const cookies = getAllRequestCookies(args.request);
      return {
        match,
        cookies
      };
    });
  }
  predicate(args) {
    const hasMatchingMethod = this.matchMethod(args.request.method);
    const hasMatchingUrl = args.parsedResult.match.matches;
    return hasMatchingMethod && hasMatchingUrl;
  }
  matchMethod(actualMethod) {
    return this.info.method instanceof RegExp ? this.info.method.test(actualMethod) : isStringEqual(this.info.method, actualMethod);
  }
  extendResolverArgs(args) {
    var _a;
    return {
      params: ((_a = args.parsedResult.match) == null ? void 0 : _a.params) || {},
      cookies: args.parsedResult.cookies
    };
  }
  log(args) {
    return __async(this, null, function* () {
      const publicUrl = getPublicUrlFromRequest(args.request);
      const loggedRequest = yield serializeRequest(args.request);
      const loggedResponse = yield serializeResponse(args.response);
      const statusColor = getStatusCodeColor(loggedResponse.status);
      console.groupCollapsed(
        devUtils.formatMessage(
          `${getTimestamp()} ${args.request.method} ${publicUrl} (%c${loggedResponse.status} ${loggedResponse.statusText}%c)`
        ),
        `color:${statusColor}`,
        "color:inherit"
      );
      console.log("Request", loggedRequest);
      console.log("Handler:", this);
      console.log("Response", loggedResponse);
      console.groupEnd();
    });
  }
}
export {
  HttpHandler,
  HttpMethods
};
