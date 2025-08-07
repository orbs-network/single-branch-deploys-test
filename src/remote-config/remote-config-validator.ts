import { remoteConfigSchemaRaw } from './schemas/remote-config-schema'
import { RemoteConfigRaw } from './types/remote-config-types.gen'

export class ErrorWithCode extends Error {
  constructor(
    message: string,
    public errorCode: string,
    public meta?: Record<string, unknown>,
  ) {
    super(message)
  }
}

export const validateRemoteConfigRaw = (rawObject: string) => {
  const rawJsonObj: RemoteConfigRaw = JSON.parse(rawObject)
  const validation = remoteConfigSchemaRaw.validate(rawJsonObj)
  if (validation.error) {
    throw new ErrorWithCode('Invalid remote config', 'Shite', {
      errors: JSON.stringify(validation.error),
    })
  }

  return rawJsonObj
}
