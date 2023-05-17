import type { Document } from './document.model'

export interface Fn extends Document {
  /**
   * The name of this function (param case).
   */
  name: string
  /**
   * Docker image url.
   */
  image: string
  /**
   * Environment variables (value or secret).
   */
  env: FnEnv[]
}

export interface FnEnv {
  name: string
  value: string
}

export type FnUpdateBody = Pick<Fn, 'image' | 'env'>
