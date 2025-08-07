// /* eslint-disable no-console */
// import { AppConfigDataClient, GetLatestConfigurationCommand, StartConfigurationSessionCommand } from '@aws-sdk/client-appconfigdata'
// import { envStr, envStrDefault } from '../../env'
// import { ErrorWithCode } from '../../error-codes'
// import { validateRemoteConfigRaw } from '../remote-config-validator'

// const APPCONFIG_APP_NAME = envStr('APPCONFIG_APP_NAME')
// const APPCONFIG_CONFIG_ENV_NAME = envStr('APPCONFIG_CONFIG_ENV_NAME')
// const APPCONFIG_CONFIG_PROFILE_NAME = envStr('APPCONFIG_CONFIG_PROFILE_NAME')
// const AWS_REGION = envStrDefault('AWS_REGION', 'ap-northeast-1')

// /**
//  * Validates that the deployed config in AppConfig matches the schema in the codebase.
//  */
// async function validateDeployedConfig(): Promise<void> {
//   const appConfigClient = new AppConfigDataClient({ region: AWS_REGION })

//   const scs = await appConfigClient.send(
//     new StartConfigurationSessionCommand({
//       ApplicationIdentifier: APPCONFIG_APP_NAME,
//       EnvironmentIdentifier: APPCONFIG_CONFIG_ENV_NAME,
//       ConfigurationProfileIdentifier: APPCONFIG_CONFIG_PROFILE_NAME,
//     }),
//   )
//   const { InitialConfigurationToken } = scs

//   const latestConfig = await appConfigClient.send(
//     new GetLatestConfigurationCommand({
//       ConfigurationToken: InitialConfigurationToken,
//     }),
//   )

//   if (!latestConfig.Configuration) {
//     throw new Error('AppConfig configuration is undefined')
//   }

//   try {
//     validateRemoteConfigRaw(latestConfig.Configuration.transformToString())
//   } catch (error: unknown) {
//     const err = error as ErrorWithCode & { meta: { errors: string } }
//     const errors = JSON.parse(err.meta.errors)
//     console.log(
//       `${errors.details[0].message}, but not found in deployed config. Please update in https://github.com/orbs-network/perps-hedger-config and re-run this pipeline`,
//     )
//     console.warn('---------------------------------')
//     console.log('Further details:')
//     console.log(errors.details[0])

//     process.exit(1)
//   }

//   console.log('Schema matches deployed config')
//   process.exit(0)
// }

// void validateDeployedConfig()
