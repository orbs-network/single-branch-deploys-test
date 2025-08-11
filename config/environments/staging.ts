import { RemoteConfigRaw } from '@/remote-config/types/remote-config-types.gen'
import { DeepPartial } from '../utils/partial'

// Staging configuration overrides - extends base config with environment-specific settings
export const stagingOverrides: DeepPartial<RemoteConfigRaw> = {
  globals: {
    something: 'cool!!!!!!!!!',
    somethingElse: '77777777777',
  },
}
