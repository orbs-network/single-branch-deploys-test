import { cloneDeep, isArray, isObject, mergeWith } from 'lodash'

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

function customizer(objValue: any, srcValue: any): any {
  // Handle null/undefined source - return target (original behavior)
  if (srcValue === null || srcValue === undefined) {
    return objValue
  }

  // For arrays, replace completely instead of merging (original behavior)
  if (isArray(srcValue)) {
    return srcValue
  }

  // For objects, let lodash handle recursive merging
  if (isObject(srcValue) && isObject(objValue)) {
    return undefined // Let lodash merge recursively
  }

  // For primitives, use source value (original behavior)
  return srcValue
}

export function createConfig(baseConfig: any, overrides: any): any {
  // Clone the base config to avoid mutating it
  const clonedBase = cloneDeep(baseConfig)
  return mergeWith(clonedBase, overrides, customizer)
}
