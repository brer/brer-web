import type { Document } from './document.model'

export interface Fn extends Document {
  /**
   * The name of this function (param case).
   */
  name: string
  /**
   * Docker image url.
   */
  image?: FnImage
  /**
   * Environment variables (value or secret).
   */
  env: FnEnv[]
}

export interface FnImage {
  host: string
  name: string
  tag: string
}

export interface FnEnv {
  name: string
  value: string
}

export interface FnSearchParams {
  name?: string
  continue?: string
  direction?: 'asc' | 'desc'
  limit?: number
  sort?: 'createdAt' | 'name'
}

export interface FnTriggerParams {
  body?: any
  env?: FnEnv[]
}

export type FnCreateBody = Pick<Fn, 'name' | 'image' | 'env'>
export type FnUpdateBody = Pick<Fn, 'image' | 'env'>
