#!/usr/bin/env ts-node
/* eslint-disable no-console */

import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

async function checkGeneratedFiles() {
  try {
    console.log('🔍 Checking generated configuration files...')

    // Define the generated directory and files
    const generatedDir = path.join(__dirname, '../generated')
    const generatedFiles = ['development.json', 'staging.json', 'prod.json']

    // Check if the generated directory exists
    if (!fs.existsSync(generatedDir)) {
      console.log(`❌ Generated directory not found: ${generatedDir}`)
      process.exit(1)
    }

    // Check if all generated files exist
    for (const file of generatedFiles) {
      const filePath = path.join(generatedDir, file)
      if (!fs.existsSync(filePath)) {
        console.log(`❌ Generated file not found: ${filePath}`)
        process.exit(1)
      }
    }

    console.log('✅ All generated files exist')

    // Validate generated JSON files with Joi schema
    console.log('🔍 Validating generated JSON files with Joi schema...')
    try {
      execSync('npm run validate-configs', { stdio: 'inherit' })
      console.log('✅ Joi validation passed')
    } catch (error) {
      console.log('❌ Joi validation failed')
      process.exit(1)
    }

    // Check if any generated files are dirty (have uncommitted changes)
    console.log('🔍 Checking if generated files are dirty...')
    const dirtyFiles: string[] = []

    for (const file of generatedFiles) {
      const filePath = path.join(generatedDir, file)
      try {
        // Check if the file has uncommitted changes
        execSync(`git diff --quiet "${filePath}"`, { stdio: 'ignore' })
      } catch (error) {
        // git diff --quiet exits with 1 if there are differences
        dirtyFiles.push(filePath)
      }
    }

    if (dirtyFiles.length > 0) {
      console.log('❌ Error: The following generated files have uncommitted changes:')
      for (const file of dirtyFiles) {
        console.log(`   - ${file}`)
      }
      console.log('')
      console.log('💡 Please review the changes and stage them manually before committing:')
      console.log(`   git add ${generatedDir}/*.json`)
      console.log('')
      console.log('   These files should only be modified by the generation script.')
      console.log('   If the changes look correct, stage them and try committing again.')
      process.exit(1)
    }

    console.log('✅ No dirty generated files found')
    console.log('✅ Generated files check completed successfully')
  } catch (error) {
    console.error('❌ Error during generated files check:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  checkGeneratedFiles().catch(console.error)
}
