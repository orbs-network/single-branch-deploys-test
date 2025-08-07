// Runs in pre-commit hook to generate Typescript types from schemas
import { convertFromDirectory } from 'joi-to-typescript'

void (async () => {
  await convertFromDirectory({
    schemaDirectory: 'src/remote-config/schemas',
    typeOutputDirectory: 'src/remote-config/types',
    debug: true,
    defaultToRequired: true,
    omitIndexFiles: true,
    interfaceFileSuffix: '-types.gen',
    schemaFileSuffix: '-schema',
  })
})()
