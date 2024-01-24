"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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
var parseGraphQLRequest_exports = {};
__export(parseGraphQLRequest_exports, {
  parseDocumentNode: () => parseDocumentNode,
  parseGraphQLRequest: () => parseGraphQLRequest
});
module.exports = __toCommonJS(parseGraphQLRequest_exports);
var import_graphql = require("graphql");
var import_getPublicUrlFromRequest = require("../request/getPublicUrlFromRequest.js");
var import_devUtils = require("./devUtils.js");
var import_jsonParse = require("./jsonParse.js");
var import_parseMultipartData = require("./parseMultipartData.js");
function parseDocumentNode(node) {
  var _a;
  const operationDef = node.definitions.find((definition) => {
    return definition.kind === "OperationDefinition";
  });
  return {
    operationType: operationDef == null ? void 0 : operationDef.operation,
    operationName: (_a = operationDef == null ? void 0 : operationDef.name) == null ? void 0 : _a.value
  };
}
function parseQuery(query) {
  try {
    const ast = (0, import_graphql.parse)(query);
    return parseDocumentNode(ast);
  } catch (error) {
    return error;
  }
}
function extractMultipartVariables(variables, map, files) {
  const operations = { variables };
  for (const [key, pathArray] of Object.entries(map)) {
    if (!(key in files)) {
      throw new Error(`Given files do not have a key '${key}' .`);
    }
    for (const dotPath of pathArray) {
      const [lastPath, ...reversedPaths] = dotPath.split(".").reverse();
      const paths = reversedPaths.reverse();
      let target = operations;
      for (const path of paths) {
        if (!(path in target)) {
          throw new Error(`Property '${paths}' is not in operations.`);
        }
        target = target[path];
      }
      target[lastPath] = files[key];
    }
  }
  return operations.variables;
}
function getGraphQLInput(request) {
  return __async(this, null, function* () {
    var _a;
    switch (request.method) {
      case "GET": {
        const url = new URL(request.url);
        const query = url.searchParams.get("query");
        const variables = url.searchParams.get("variables") || "";
        return {
          query,
          variables: (0, import_jsonParse.jsonParse)(variables)
        };
      }
      case "POST": {
        const requestClone = request.clone();
        if ((_a = request.headers.get("content-type")) == null ? void 0 : _a.includes("multipart/form-data")) {
          const responseJson = (0, import_parseMultipartData.parseMultipartData)(
            yield requestClone.text(),
            request.headers
          );
          if (!responseJson) {
            return null;
          }
          const _b = responseJson, { operations, map } = _b, files = __objRest(_b, ["operations", "map"]);
          const parsedOperations = (0, import_jsonParse.jsonParse)(
            operations
          ) || {};
          if (!parsedOperations.query) {
            return null;
          }
          const parsedMap = (0, import_jsonParse.jsonParse)(map || "") || {};
          const variables = parsedOperations.variables ? extractMultipartVariables(
            parsedOperations.variables,
            parsedMap,
            files
          ) : {};
          return {
            query: parsedOperations.query,
            variables
          };
        }
        const requestJson = yield requestClone.json().catch(() => null);
        if (requestJson == null ? void 0 : requestJson.query) {
          const { query, variables } = requestJson;
          return {
            query,
            variables
          };
        }
      }
      default:
        return null;
    }
  });
}
function parseGraphQLRequest(request) {
  return __async(this, null, function* () {
    const input = yield getGraphQLInput(request);
    if (!input || !input.query) {
      return;
    }
    const { query, variables } = input;
    const parsedResult = parseQuery(query);
    if (parsedResult instanceof Error) {
      const requestPublicUrl = (0, import_getPublicUrlFromRequest.getPublicUrlFromRequest)(request);
      throw new Error(
        import_devUtils.devUtils.formatMessage(
          'Failed to intercept a GraphQL request to "%s %s": cannot parse query. See the error message from the parser below.\n\n%s',
          request.method,
          requestPublicUrl,
          parsedResult.message
        )
      );
    }
    return {
      query: input.query,
      operationType: parsedResult.operationType,
      operationName: parsedResult.operationName,
      variables
    };
  });
}
