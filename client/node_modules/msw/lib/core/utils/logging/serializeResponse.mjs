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
import statuses from "@bundled-es-modules/statuses";
const { message } = statuses;
function serializeResponse(response) {
  return __async(this, null, function* () {
    const responseClone = response.clone();
    const responseText = yield responseClone.text();
    const responseStatus = responseClone.status || 200;
    const responseStatusText = responseClone.statusText || message[responseStatus] || "OK";
    return {
      status: responseStatus,
      statusText: responseStatusText,
      headers: Object.fromEntries(responseClone.headers.entries()),
      body: responseText
    };
  });
}
export {
  serializeResponse
};
