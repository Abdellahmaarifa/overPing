import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { ApolloClientOptions } from "@apollo/react-hooks";
import { authLink } from "gql/Apollo";
import { makeAutoObservable } from "mobx";

export default class initializeDomainLayer implements Store {
  client: ApolloClient<NormalizedCacheObject>;
  token: string | null;
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
    this.token = null;
    makeAutoObservable(this);
  }

  getToken() {
    return this.token;
  }

  setToken(token: string | null) {
    this.client.setLink(authLink(token));
    this.token = token;
  }
}

export interface Store {
  client: ApolloClient<NormalizedCacheObject>;
  token: string | null;
  getToken: () => string | null;
  setToken: (token: string | null) => void;
}
