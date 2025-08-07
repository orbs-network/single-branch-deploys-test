/**
 * Convert JSON configuration to TypeScript format
 */
export function jsonToTypeScript(jsonConfig: any): string {
  return `export const config = ${JSON.stringify(jsonConfig, null, 2)};
`
}

/**
 * Convert JSON configuration to environment override format
 */
export function jsonToOverride(jsonConfig: any): string {
  return `export const override = ${JSON.stringify(jsonConfig, null, 2)};
`
}

/**
 * Extract specific sections from JSON config
 */
export function extractSection(jsonConfig: any, section: string): any {
  return jsonConfig[section] || {}
}

/**
 * Convert JSON config to base configuration format
 */
export function convertToBaseConfig(jsonConfig: any): any {
  return {
    globals: extractSection(jsonConfig, 'globals'),
    binance: extractSection(jsonConfig, 'binance'),
    business: extractSection(jsonConfig, 'business'),
    symbols: extractSection(jsonConfig, 'symbols'),
    chains: extractSection(jsonConfig, 'chains'),
    symmIdToMultiaccounts: extractSection(jsonConfig, 'symmIdToMultiaccounts'),
    system: extractSection(jsonConfig, 'system'),
  }
}

/**
 * Generate TypeScript configuration files from JSON
 */
export function generateTypeScriptConfigs(developmentJson: any, stagingJson: any, productionJson: any): any {
  // Use production as base (most complete)
  const baseConfigs = convertToBaseConfig(productionJson)

  // Create overrides by comparing with base
  const developmentOverride = createOverride(productionJson, developmentJson)
  const stagingOverride = createOverride(productionJson, stagingJson)
  const productionOverride = createOverride(productionJson, productionJson) // Should be empty

  return {
    baseConfigs,
    developmentOverride,
    stagingOverride,
    productionOverride,
  }
}

/**
 * Create override by comparing base config with target config
 */
function createOverride(baseConfig: any, targetConfig: any): any {
  const override: any = {}

  for (const key in targetConfig) {
    if (JSON.stringify(targetConfig[key]) !== JSON.stringify(baseConfig[key])) {
      override[key] = targetConfig[key]
    }
  }

  return override
}
