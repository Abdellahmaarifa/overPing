self.addEventListener("install", (e) => {
  self.skipWaiting(); // update even if other tabs are open in the browser
});
console.log("lalal");
const proxyResponse = (orig) =>
  orig.status < 400
    ? orig
    : new Response(orig.text(), {
        status: 202,
        statusText: "Accepted",
        headers: new Headers({
          Status: orig.status,
          StatusText: orig.statusText,
        }),
      });

self.addEventListener("fetch", (e) =>
  e.respondWith(fetch(e.request).then(proxyResponse))
);

navigator.serviceWorker.getRegistrations().then((registrations) => {
  console.log(registrations);
});
