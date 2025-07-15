import { base } from "./base";
import { createConfig } from "./utils";

export const prod = createConfig(base, {
  app: {
    name: "Production",
    version: "1.0.0",
    port: 8080,
    host: "0.0.0.0",
  },
  database: {
    connectionTimeout: 60000,
    maxConnections: 500,
    ssl: false,
  },
});

console.log("prod", prod);
