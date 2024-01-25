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
import { parse } from "graphql";
import { getPublicUrlFromRequest } from '../request/getPublicUrlFromRequest.mjs';
import { devUtils } from './devUtils.mjs';
import { jsonParse } from './jsonParse.mjs';
import { parseMultipartData } from './parseMultipartData.mjs';
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
    const ast = parse(query);
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
          variables: jsonParse(variables)
        };
      }
      case "POST": {
        const requestClone = request.clone();
        if ((_a = request.headers.get("content-type")) == null ? void 0 : _a.includes("multipart/form-data")) {
          const responseJson = parseMultipartData(
            yield requestClone.text(),
            request.headers
          );
          if (!responseJson) {
            return null;
          }
          const _b = responseJson, { operations, map } = _b, files = __objRest(_b, ["operations", "map"]);
          const parsedOperations = jsonParse(
            operations
          ) || {};
          if (!parsedOperations.query) {
            return null;
          }
          const parsedMap = jsonParse(map || "") || {};
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
      const requestPublicUrl = getPublicUrlFromRequest(request);
      throw new Error(
        devUtils.formatMessage(
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
export {
  parseDocumentNode,
  parseGraphQLRequest
};
