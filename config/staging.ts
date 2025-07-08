import { base } from "./base";
import { createConfig } from "./utils";

export const staging = createConfig(base, {
  app: {
    name: "Staging",
    version: "1.0.0",
  },
});

console.log("staging", staging);
