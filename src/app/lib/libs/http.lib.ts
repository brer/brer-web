/**
 * Fetch data from server APIs.
 * All requests MUST use this method.
 * @param method - the method to use
 * @param api - the API url
 * @param body - the body params
 * @returns the Promise<Response> for make the request
 */
function fetchData(
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH',
  apiModel: string,
  body?: any
): Promise<Response> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const TOKEN = process.env.NEXT_PUBLIC_TOKEN

  if (!API_URL || !TOKEN) {
    throw new Error('Brer application not correctly configured')
  }

  return fetch(`/api/${apiModel}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
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
export async function postData<T>(api: string, body = {}): Promise<T> {
  const response = await fetchData('POST', api, body)
  return response.json()
}

/**
 * Make a PUTH request
 * @param api - the api to call
 * @param body - the body params to send
 * @returns the Promise<T> to make the request
 */
export async function putData<T>(api: string, body = {}): Promise<T> {
  const response = await fetchData('PUT', api, body)
  return response.json()
}

/**
 * Make a GET request
 * @param api - the api to call
 * @returns the Promise<T> to make the request
 */
export async function getData<T>(api: string, params?: any): Promise<T> {
  if (params) {
    api += '?' + new URLSearchParams(params)
  }

  const response = await fetchData('GET', api)
  return response.json()
}

/**
 * Make a PATCH request
 * @param api - the api to call
 * @param body - the body params to send
 * @returns the Promise<T> to make the request
 */
export async function patchData<T>(api: string, body = {}): Promise<T> {
  const response = await fetchData('PATCH', api, body)
  return response.json()
}

/**
 * Make a DELETE request
 * @param api - the api to call
 * @param body - the body params to send
 * @returns the Promise<T> to make the request
 */
export async function deleteData<T>(api: string, body = {}): Promise<T> {
  const response = await fetchData('DELETE', api, body)
  return response.json()
}

/**
 * Download data from server
 * @param api - the api to call
 * @returns the Promise<Blob> to download the data
 */
export async function downloadData(api: string): Promise<Blob> {
  const response = await fetchData('GET', api)
  return response.blob()
}

/**
 * Read data from server
 * @param api - the api to call
 * @returns the Promise<string> to read the data
 */
export async function plainData(api: string): Promise<string> {
  const response = await fetchData('GET', api)
  return response.text()
}
