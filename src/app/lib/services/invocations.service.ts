import { Invocation, InvocationSearchParams } from '../models/invocation.model'
import {
  deleteData,
  downloadData,
  getData,
  plainData,
} from '../utilities/http.lib'

const API_MODEL = 'invocations'
const API_VERSION = 'v1'

/**
 * Read an invocation by its key
 * @param key - the invocation key
 * @returns the Promise<{ Invocation }> for read an invocation
 */
export function readInvocation(
  key: string
): Promise<{ invocation: Invocation }> {
  return getData(`${API_VERSION}/${API_MODEL}/${key}`)
}

/**
 * Read the logs of an invocation by its key
 * @param key - the invocation key
 * @returns the Promise<string> for load invocation logs
 */
export function readInvocationLogs(key: string): Promise<string> {
  return plainData(`${API_VERSION}/${API_MODEL}/${key}/logs`)
}

/**
 * Delete an invocation by its key
 * @param key - the invocation key
 * @returns the Promise<void> for delete an invocation
 */
export function deleteInvocation(key: string): Promise<void> {
  return deleteData(`${API_VERSION}/${API_MODEL}/${key}`)
}

/**
 * Download invocation payload
 * @param key - the invocation key
 * @returns the Promise<string> for get invocation payload
 */
export function downloadInvocationPayload(key: string): Promise<Blob> {
  return downloadData(`${API_VERSION}/${API_MODEL}/${key}/payload`)
}

/**
 * Search invocations
 * @param params - the search params
 * @returns the Promise<Fn[]> for search functions
 */
export function searchInvocations(
  params?: InvocationSearchParams
): Promise<{ continue: string; invocations: Invocation[] }> {
  return getData(`${API_VERSION}/${API_MODEL}`, params)
}
