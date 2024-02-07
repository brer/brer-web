import {
  Fn,
  FnCreateBody,
  FnSearchParams,
  FnTriggerParams,
  FnUpdateBody,
} from '../models/function.model'
import { postData, getData, putData, deleteData } from '../libs/http.lib'
import { Invocation } from '../models/invocation.model'

const API_MODEL = 'functions'
const API_VERSION = 'v1'

/**
 * Create a new function
 * @param fn - the function params
 * @returns the Promise<{ Fn }> for create a new function
 */
export function createFunction(fn: FnCreateBody): Promise<{ function: Fn }> {
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
  key: string,
  params: FnTriggerParams = {},
  file?: File
): Promise<{ function: Fn; invocation: Invocation }> {
  const env = params.env
    ? params.env.reduce(
        (acc, e) => ({ ...acc, [`x-brer-env-${e.name}`]: e.value }),
        {}
      )
    : {}

  let body
  if (file) {
    const formData = new FormData()
    formData.append('file', file)
    body = formData
  } else if (params.body) {
    try {
      body = JSON.parse(params.body)
    } catch (e) {
      body = params.body
    }
  }

  return postData(`${API_VERSION}/${API_MODEL}/${key}`, body, env, false)
}

/**
 * Search functions
 * @param params - the search params
 * @returns the Promise<{ continue: string; functions: Fn[] }> for search functions
 */
export function searchFunctions(
  params?: FnSearchParams
): Promise<{ continue: string; functions: Fn[] }> {
  return getData(`${API_VERSION}/${API_MODEL}`, params)
}

/**
 * Delete a function
 * @param key - the function key
 * @returns the Promise<void> for delete a function
 */
export function deleteFunction(key: string): Promise<void> {
  return deleteData(`${API_VERSION}/${API_MODEL}/${key}`)
}
