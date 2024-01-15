import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initApolloClient } from "./gql/Apollo";

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
