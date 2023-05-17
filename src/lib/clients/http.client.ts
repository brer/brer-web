export default class HttpClient {
  private readonly BRER_URL: string
  private readonly BRER_TOKEN: string
  private readonly API_PATH: string

  constructor() {
    if (
      !process.env.BRER_URL ||
      !process.env.BRER_TOKEN ||
      !process.env.API_PATH
    ) {
      throw new Error('Brer application not correctly configured')
    }

    this.BRER_URL = process.env.BRER_URL
    this.BRER_TOKEN = process.env.BRER_TOKEN
    this.API_PATH = process.env.API_PATH
  }

  /**
   * Fetch data from server APIs.
   * All requests MUST use this method.
   * @param method - the method to use
   * @param api - the API url
   * @param body - the body params
   * @returns the Promise<Response> for make the request
   */
  private __fetchData(
    method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
    api: string,
    body?: any
  ): Promise<Response> {
    return fetch(`${this.BRER_URL}/${this.API_PATH}/${api}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.BRER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  /**
   * Make a POST request
   * @param api - the api to call
   * @param body - the body params to send
   * @returns the Promise<T> to make the request
   */
  protected async _post<T>(api: string, body = {}): Promise<T> {
    const response = await this.__fetchData('POST', api, body)
    return response.json()
  }

  /**
   * Make a PUTH request
   * @param api - the api to call
   * @param body - the body params to send
   * @returns the Promise<T> to make the request
   */
  protected async _put<T>(api: string, body = {}): Promise<T> {
    const response = await this.__fetchData('PUT', api, body)
    return response.json()
  }

  /**
   * Make a GET request
   * @param api - the api to call
   * @returns the Promise<T> to make the request
   */
  protected async _get<T>(api: string): Promise<T> {
    const response = await this.__fetchData('GET', api)
    return response.json()
  }

  /**
   * Make a PATCH request
   * @param api - the api to call
   * @param body - the body params to send
   * @returns the Promise<T> to make the request
   */
  protected async _patch<T>(api: string, body = {}): Promise<T> {
    const response = await this.__fetchData('PATCH', api, body)
    return response.json()
  }

  /**
   * Make a DELETE request
   * @param api - the api to call
   * @param body - the body params to send
   * @returns the Promise<T> to make the request
   */
  protected async _delete<T>(api: string, body = {}): Promise<T> {
    const response = await this.__fetchData('DELETE', api, body)
    return response.json()
  }
}
