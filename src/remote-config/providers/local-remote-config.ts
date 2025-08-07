import { validateRemoteConfigRaw } from '../remote-config-validator'
import { RemoteConfigRaw } from '../types/remote-config-types.gen'
import { IRemoteConfig } from './remote-config'

export const defaultConfig: RemoteConfigRaw = {
  globals: {
    something: 'something',
  },
}

export class LocalRemoteConfig implements IRemoteConfig {
  constructor() {}

  private config!: RemoteConfigRaw

  async initialize() {
    this.config = validateRemoteConfigRaw(JSON.stringify(defaultConfig))
  }

  getConfigRaw(): RemoteConfigRaw {
    if (!this.config) {
      this.config = validateRemoteConfigRaw(JSON.stringify(defaultConfig))
    }

    return this.config
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onUpdate(listener: () => unknown): void {
    // ignore
  }
}
