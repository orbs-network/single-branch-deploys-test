import { RemoteConfigRaw } from '@/remote-config/types/remote-config-types.gen'
import { DeepPartial } from '../utils/partial'

// Production configuration overrides - extends base config with environment-specific settings
export const developmentOverrides: DeepPartial<RemoteConfigRaw> = {}
