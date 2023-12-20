import App from "presentation/PresentationLayer";
import { createRoot } from "react-dom/client";
import initializeDataLayer from "./data/DataLayer";
import initializeDomainLayer from "./domain/DomainLayer";

const container = document.getElementById("root");
const root = createRoot(container!);

const { client } = new initializeDataLayer();
const store = new initializeDomainLayer(client);

root.render(<App store={store} />);
