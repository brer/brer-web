import { Fn, FnEnv } from '../models/function.model'

/**
 * Add ENV to a function
 * @param fn - the function
 * @returns the function updated
 */
export function addFunctionEnv(fn: Partial<Fn>): Partial<Fn> {
  return {
    ...fn,
    env: [...(fn.env || []), { name: '', value: '' }],
  }
}

/**
 * Remove ENV from a function
 * @param fn - the function
 * @returns the function updated
 */
export function removeFunctionEnv(fn: Partial<Fn>, env: FnEnv): Partial<Fn> {
  if (!fn.env) {
    return fn
  }

  return {
    ...fn,
    env: fn.env.filter((e) => e.name !== env.name),
  }
}
