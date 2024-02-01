export interface Document {
  /**
   * Document identifier.
   */
  _id?: string
  /**
   * Document revision identifier.
   */
  _rev?: string
  /**
   * Declares the deletion of the document.
   */
  _deleted?: boolean
  /**
   * Document version (database versioning).
   */
  _v?: number
  /**
   * ISO date string.
   */
  createdAt?: string
  /**
   * ISO date string.
   */
  updatedAt?: string
  /**
   * The project name
   */
  project?: string
  /**
   * Uploaded attachments.
   */
  _attachments?: Record<string, DocumentAttachment>
}

export interface DocumentAttachment {
  /**
   * Base-64 file content
   */
  data?: string
  content_type?: string
  revpos?: number
  digest?: string
  length?: number
  stub?: true
}
