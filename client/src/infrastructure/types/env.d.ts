interface ImportMetaEnv {
  readonly OVER_PING_GRAPHQL_API_URL: string;
  readonly OVER_PING_REFRECH_TOKEN: string;
  readonly OVER_PING_SERVER_URL_DEV: string;
  readonly OVER_PING_SERVER_URL_PROD: string;
  readonly OVER_PING_SERVER_CHAT_DEV: string;
  readonly OVER_PING_SERVER_CHAT_PROD: string;
  readonly OVER_PING_SERVER_URL_PROD_WS: string;
  readonly OVER_PING_APPOLO_SERVER_URL_PROD_WS: string;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
