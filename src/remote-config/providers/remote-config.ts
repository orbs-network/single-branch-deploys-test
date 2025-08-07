import { RemoteConfigRaw } from '../types/remote-config-types.gen'

export interface IRemoteConfig {
  getConfigRaw(): RemoteConfigRaw
  initialize(): Promise<void>
  onUpdate(listener: () => unknown): void
}
