import HttpClient from '../clients/http.client'

export default class CrudService extends HttpClient {
  constructor(
    private readonly API_MODEL: string,
    private readonly API_VERSION: string = 'v1'
  ) {
    super()
  }

  /**
   * Create a new item by params
   * @param api - the API to call
   * @param itemData - the params for create the item
   * @returns the Promise<T> for create a new item
   */
  protected async _create<T, P extends {} = Partial<T>>(
    itemData: P
  ): Promise<T> {
    return super._post<T>(`${this.API_VERSION}/${this.API_MODEL}`, itemData)
  }

  /**
   * Read an item by its ID
   * @param itemId - the item ID
   * @returns the Promise<T> for read the item
   */
  protected async _read<T>(itemId: string): Promise<T> {
    return super._get<T>(`${this.API_VERSION}/${this.API_MODEL}/${itemId}`)
  }

  /**
   * Update an item by its ID and params
   * @param itemId - the item ID
   * @param itemData - the params for update the item
   * @returns the Promise<T> for update
   */
  protected async _update<T, P extends {} = Partial<T>>(
    itemId: string,
    itemData: P
  ): Promise<T> {
    return super._put<T>(
      `${this.API_VERSION}/${this.API_MODEL}/${itemId}`,
      itemData
    )
  }

  /**
   * Delete an item by its ID
   * @param itemId - the item ID
   * @returns the Promise<T> for delete the item
   */
  protected override async _delete<T>(itemId: string): Promise<T> {
    return super._delete<T>(`${this.API_VERSION}/${this.API_MODEL}/${itemId}`)
  }
}
