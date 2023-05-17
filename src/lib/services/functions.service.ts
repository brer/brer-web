import { Fn, FnUpdateBody } from '../models/function.model'
import { Invocation } from '../models/invocation.model'
import CrudService from './crud.service'

const API_MODEL = 'functions'
const API_VERSION = 'v1'

export default class FunctionsService extends CrudService {
  constructor() {
    super(API_MODEL, API_VERSION)
  }

  /**
   * Create a new function
   * @param fn - the function params
   * @returns the Promise<{ Fn }> for create a new function
   */
  create(fn: Fn): Promise<{ function: Fn }> {
    return super._create(fn)
  }

  /**
   * Read a function by its key
   * @param key - the function key
   * @returns the Promise<{ Fn }> for read a function
   */
  read(key: string): Promise<{ function: Fn }> {
    return super._read(key)
  }

  /**
   * Update a function
   * @param key - the function key
   * @param body - the function update body
   * @returns the Promise<{ Fn }> for update a function
   */
  update(key: string, body: FnUpdateBody): Promise<{ function: Fn }> {
    return super._update(key, body)
  }

  /**
   * Trigger a function
   * @param key - the function key
   * @returns the Promise<{ Fn, Invocation }> for trigger a function
   */
  trigger(key: string): Promise<{ function: Fn; invocation: Invocation }> {
    return super._post(`${key}/trigger`)
  }
}
