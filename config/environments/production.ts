import { RemoteConfigRaw } from '@/remote-config/types/remote-config-types.gen'
import { DeepPartial } from '../utils/partial'

// Production configuration overrides - extends base config with environment-specific settings
export const productionOverrides: DeepPartial<RemoteConfigRaw> = {
  globals: {
    something: 'something',
    somethingElse: 'somethingElse!@@@AAAAABBB',
  },
}
