import { Config } from "../src/schema";

export const base: Config = {
  app: {
    name: "Base",
    version: "1.0.0",
    port: 3000,
    host: "localhost",
  },
  database: {
    connectionTimeout: 30000,
    maxConnections: 10,
    ssl: false,
  },
};
