import { Fn, FnUpdateBody } from '../models/function.model'
import { postData, getData, putData } from '../utilities/http.lib'
import { Invocation } from '../models/invocation.model'
import { FUNCTIONS_MOCK } from '../consts/function.const'
import { INVOCATIONS_MOCK } from '../consts/invocation.const'

const API_MODEL = 'functions'
const API_VERSION = 'v1'

/**
 * Create a new function
 * @param fn - the function params
 * @returns the Promise<{ Fn }> for create a new function
 */
export function createFunction(fn: Fn): Promise<{ function: Fn }> {
  return postData(`${API_VERSION}/${API_MODEL}`, fn)
}

/**
 * Read a function by its key
 * @param key - the function key
 * @returns the Promise<{ Fn }> for read a function
 */
export function readFunction(key: string): Promise<{ function: Fn }> {
  return getData(`${API_VERSION}/${API_MODEL}/${key}`)
}

/**
 * Update a function
 * @param key - the function key
 * @param body - the function update body
 * @returns the Promise<{ Fn }> for update a function
 */
export function updateFunction(
  key: string,
  body: FnUpdateBody
): Promise<{ function: Fn }> {
  return putData(`${API_VERSION}/${API_MODEL}/${key}`, body)
}

/**
 * Trigger a function
 * @param key - the function key
 * @returns the Promise<{ Fn, Invocation }> for trigger a function
 */
export function triggerFunction(
  key: string
): Promise<{ function: Fn; invocation: Invocation }> {
  return postData(`${API_VERSION}/${API_MODEL}/${key}/trigger`)
}

/**
 * Search functions
 * @param name - the function name to search for
 * @returns the Promise<Fn[]> for search functions
 */
export function searchFunctions(name?: string): Promise<Fn[]> {
  // return getData(`${API_VERSION}/${API_MODEL}`, name ? { name } : undefined)
  return Promise.all(FUNCTIONS_MOCK)
}

/**
 * Search invocations
 * @param key - the function key
 * @returns the Promise<>
 */
export function searchFunctionInvocations(key: string): Promise<Invocation[]> {
  // return getData(`${API_VERSION}/${API_MODEL}/${key}/invocations`)
  return Promise.all(INVOCATIONS_MOCK.filter((i) => i.functionName === key))
}
