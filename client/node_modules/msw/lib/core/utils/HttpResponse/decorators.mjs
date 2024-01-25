var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import statuses from "@bundled-es-modules/statuses";
const { message } = statuses;
function normalizeResponseInit(init = {}) {
  const status = (init == null ? void 0 : init.status) || 200;
  const statusText = (init == null ? void 0 : init.statusText) || message[status] || "";
  const headers = new Headers(init == null ? void 0 : init.headers);
  return __spreadProps(__spreadValues({}, init), {
    headers,
    status,
    statusText
  });
}
function decorateResponse(response, init) {
  var _a;
  if (init.type) {
    Object.defineProperty(response, "type", {
      value: init.type,
      enumerable: true,
      writable: false
    });
  }
  if (typeof document !== "undefined") {
    const responseCookies = ((_a = init.headers.get("Set-Cookie")) == null ? void 0 : _a.split(",")) || [];
    for (const cookieString of responseCookies) {
      document.cookie = cookieString;
    }
  }
  return response;
}
export {
  decorateResponse,
  normalizeResponseInit
};
