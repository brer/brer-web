import { FnEnv } from '../models/function.model'

/**
 * Add ENV to a function
 * @param fn - the function
 * @returns the function updated
 */
export function addEnv(env?: FnEnv[]): FnEnv[] {
  return [...(env || []), { name: '', value: '' }]
}

/**
 * Remove ENV from a function
 * @param fn - the function
 * @returns the function updated
 */
export function removeEnv(
  env: FnEnv[] | undefined,
  index: number
): FnEnv[] | undefined {
  if (!env) {
    return env
  }

  return env.filter((e, i) => i !== index)
}
