import { merge } from "lodash";
import { Config } from "../src/schema";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function createConfig(
  baseConfig: Config,
  overrides: DeepPartial<Config>
): Config {
  return merge({}, baseConfig, overrides);
}
