import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initApolloClient } from "./gql/Apollo";
import { Socket } from "socket.io-client";

export default class initializeDataLayer {
  client: ApolloClient<NormalizedCacheObject>;
  constructor() {
    this.client = this.initClient()!;
  }
  initClient() {
    try {
      return initApolloClient();
    } catch (err) {
      // A BETTER ERROR HANDLING IS NEEDED!!
    }
  }
}
