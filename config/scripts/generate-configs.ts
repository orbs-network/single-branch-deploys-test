#!/usr/bin/env ts-node

import * as fs from 'fs'
import * as path from 'path'
import { baseConfig } from '../base'
import { developmentOverrides } from '../environments/development'
import { productionOverrides } from '../environments/production'
import { stagingOverrides } from '../environments/staging'
import { createConfig } from '../utils/merger'

/**
 * Generate JSON outputs from TypeScript configurations
 */
async function generateJsonOutputs() {
  try {
    console.log('🚀 Generating JSON outputs from TypeScript configurations...')

    // Create merged configurations
    const developmentConfig = createConfig(baseConfig, developmentOverrides)
    const stagingConfig = createConfig(baseConfig, stagingOverrides)
    const productionConfig = createConfig(baseConfig, productionOverrides)

    // Create output directory
    const outputDir = path.join(__dirname, '../generated')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
      console.log(`📁 Created output directory: ${outputDir}`)
    }

    // Generate configurations from TypeScript configs
    const configs = [
      { name: 'development', config: developmentConfig, file: 'development.json' },
      { name: 'staging', config: stagingConfig, file: 'staging.json' },
      { name: 'production', config: productionConfig, file: 'prod.json' },
    ]

    for (const { name, config, file } of configs) {
      console.log(`📝 Generating ${name} configuration...`)

      const outputPath = path.join(outputDir, file)
      const jsonContent = JSON.stringify(config, null, 2)

      fs.writeFileSync(outputPath, jsonContent)
      console.log(`✅ Generated: ${outputPath}`)
    }

    console.log('🎉 All JSON files generated successfully!')
  } catch (error) {
    console.error('❌ Error generating JSON outputs:', error)
    throw error
  }
}

// Run if called directly
if (require.main === module) {
  generateJsonOutputs().catch(console.error)
}

export { generateJsonOutputs }
