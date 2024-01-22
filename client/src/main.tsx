import App from "presentation/PresentationLayer";
import { createRoot } from "react-dom/client";
import initializeDataLayer from "./data/DataLayer";
import initializeDomainLayer from "./domain/DomainLayer";
import { registerGlobalEvents } from "gql/events";

const container = document.getElementById("root");
const root = createRoot(container!);
registerGlobalEvents();
const { client } = new initializeDataLayer();
const store = new initializeDomainLayer(client);
root.render(<App store={store} />);
