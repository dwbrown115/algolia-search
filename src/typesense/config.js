// const Typesense = require("typesense");
import Typesense from "typesense";


export const client = new Typesense.Client({
  nodes: [
    {
      host: TYPESENSE_HOST, // where xxx is the ClusterID of your Typesense Cloud cluster
      port: "443",
      protocol: "https",
    },
  ],
  apiKey: TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 2,
});
