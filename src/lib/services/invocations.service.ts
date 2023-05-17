import { Invocation } from '../models/invocation.model'
import CrudService from './crud.service'

const API_MODEL = 'invocations'
const API_VERSION = 'v1'

export default class InvocationsService extends CrudService {
  constructor() {
    super(API_MODEL, API_VERSION)
  }

  /**
   * Read an invocation by its key
   * @param key - the invocation key
   * @returns the Promise<{ Invocation }> for read an invocation
   */
  read(key: string): Promise<{ invocation: Invocation }> {
    return super._read(key)
  }

  /**
   * Read the logs of an invocation by its key
   * @param key - the invocation key
   * @returns the Promise<string> for load invocation logs
   */
  readLogs(key: string): Promise<string> {
    return super._get(`${key}/logs`)
  }

  /**
   * Delete an invocation by its key
   * @param key - the invocation key
   * @returns the Promise<void> for delete an invocation
   */
  delete(key: string): Promise<void> {
    return super._delete(key)
  }

  /**
   * Download invocation payload
   * @param key - the invocation key
   * @returns the Promise<string> for get invocation payload
   */
  downloadPayload(key: string): Promise<string> {
    return super._get(`${key}/payload`)
  }
}
