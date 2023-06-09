import type { Document } from './document.model'
import type { FnEnv } from './function.model'

export interface Invocation extends Document {
  /**
   * Current status.
   * See `InvocationStatus` type for more info.
   */
  status: InvocationStatus
  /**
   * Completition result value.
   * Available when status is "completed".
   */
  result?: any
  /**
   * Failure reason.
   * Available when status is "failed".
   */
  reason?: any
  /**
   *
   */
  phases: InvocationPhase[]
  /**
   *
   */
  functionName: string
  /**
   *
   */
  image: string
  /**
   *
   */
  env: FnEnv[]
}

/**
 * Possible Invocation statuses.
 *
 * - `"pending"` The Invocation is queued to be started.
 * - `"initializing"` The Invocation code is running (waiting for ack).
 * - `"running"` The Invocation has started to process its task.
 * - `"completed"` The Invocation has completed its task successfully.
 * - `"failed"` The Invocation has failed its task.
 */
export type InvocationStatus =
  | 'pending'
  | 'initializing'
  | 'running'
  | 'completed'
  | 'failed'

export interface InvocationPhase {
  /**
   * Phase status.
   */
  status: InvocationStatus
  /**
   * ISO 8601 date string.
   */
  date: string
}

export interface InvocationSearchParams {
  functionName?: string
  continue?: string
  direction?: 'asc' | 'desc'
  limit?: number
  sort?: 'createdAt'
}
