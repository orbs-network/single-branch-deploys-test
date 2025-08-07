#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import { remoteConfigSchemaRaw } from '@/remote-config/schemas/remote-config-schema'
import { generateJsonOutputs } from './generate-configs'

async function validateAllJsons() {
  try {
    console.log('🔍 Validating all generated JSON files with Joi schema...')
    console.log('📝 Generating JSON outputs...')
    await generateJsonOutputs()

    const environments = [
      { name: 'Development', file: 'development.json' },
      { name: 'Staging', file: 'staging.json' },
      { name: 'Production', file: 'prod.json' },
    ]

    let allPassed = true

    for (const env of environments) {
      const generatedPath = path.join(__dirname, `../generated/${env.file}`)

      console.log(`\n🔍 Validating ${env.name} configuration...`)

      if (!fs.existsSync(generatedPath)) {
        console.log(`❌ Generated file not found: ${generatedPath}`)
        allPassed = false
        continue
      }

      try {
        // Read and parse the generated JSON
        const generatedContent = fs.readFileSync(generatedPath, 'utf8')
        const generatedConfig = JSON.parse(generatedContent)

        // Validate generated file against Joi schema
        const { error } = remoteConfigSchemaRaw.validate(generatedConfig, {
          abortEarly: false,
          allowUnknown: true,
        })

        if (error) {
          console.log(`❌ ${env.name} validation FAILED:`)
          console.log(`   File: ${env.file}`)
          console.log(`   Errors:`)
          error.details.forEach((detail, index) => {
            console.log(`   ${index + 1}. ${detail.path.join('.')}: ${detail.message}`)
          })
          allPassed = false
        } else {
          console.log(`✅ ${env.name} validation PASSED`)
          console.log(`   File: ${env.file}`)
          console.log(`   ✅ Schema validation successful`)
        }
      } catch (parseError) {
        console.log(`❌ ${env.name} validation FAILED:`)
        console.log(`   File: ${env.file}`)
        console.log(`   Error: Invalid JSON - ${parseError}`)
        allPassed = false
      }
    }

    console.log('\n============================================================')
    if (allPassed) {
      console.log('✅ ALL VALIDATIONS PASSED!')
      console.log('✅ All generated JSON files are valid according to the Joi schema')
    } else {
      console.log('❌ VALIDATION FAILED!')
      console.log('❌ Some generated JSON files failed schema validation')
    }
    console.log('============================================================\n')

    if (!allPassed) {
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error during validation:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  validateAllJsons().catch(console.error)
}
