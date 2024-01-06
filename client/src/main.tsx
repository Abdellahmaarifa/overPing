import App from "presentation/PresentationLayer";
import { createRoot } from "react-dom/client";
import initializeDataLayer from "./data/DataLayer";
import initializeDomainLayer from "./domain/DomainLayer";

const container = document.getElementById("root");
const root = createRoot(container!);

const { client } = new initializeDataLayer();
const store = new initializeDomainLayer(client);

const event = new Event("alive");
// Listen for the event.
window.addEventListener(
  "alive",
  (e) => {
    /* … */
    setTimeout(() => {
      console.log("i am live!");
      window.dispatchEvent(event);
    }, 2000);
  },
  false
);

// Dispatch the event.
window.dispatchEvent(event);

window.addEventListener("online", () => {
  setTimeout(() => {
    console.log("telling the server that i am alive");
  }, 2000);
});
root.render(<App store={store} />);
