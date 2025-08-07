import { RemoteConfigRaw } from '@/remote-config/types/remote-config-types.gen'

// Base configuration - common settings across all environments
export const baseConfig: RemoteConfigRaw = {
  globals: {
    something: 'something',
  },
}
