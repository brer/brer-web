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
  body?: any,
  headers?: any,
  stringify = true
): Promise<Response> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  if (!API_URL) {
    throw new Error('Brer application not correctly configured')
  }

  if (body) {
    body = stringify ? JSON.stringify(body) : undefined
  }

  return fetch(`/api/${apiModel}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body,
  }).then((response) => {
    if (!response.ok) {
      return Promise.reject(response)
    }

    return response
  })
}

/**
 * Make a POST request
 * @param api - the api to call
 * @param body - the body params to send
 * @returns the Promise<T> to make the request
 */
export async function postData<T>(
  api: string,
  body = {},
  headers = {},
  stringify = true
): Promise<T> {
  return fetchData('POST', api, body, headers, stringify).then((response) =>
    response.json()
  )
}

/**
 * Make a PUTH request
 * @param api - the api to call
 * @param body - the body params to send
 * @returns the Promise<T> to make the request
 */
export async function putData<T>(api: string, body = {}): Promise<T> {
  return fetchData('PUT', api, body).then((response) => response.json())
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

  return fetchData('GET', api).then((response) => response.json())
}

/**
 * Make a PATCH request
 * @param api - the api to call
 * @param body - the body params to send
 * @returns the Promise<T> to make the request
 */
export async function patchData<T>(api: string, body = {}): Promise<T> {
  return fetchData('PATCH', api, body).then((response) => response.json())
}

/**
 * Make a DELETE request
 * @param api - the api to call
 * @param body - the body params to send
 * @returns the Promise<T> to make the request
 */
export async function deleteData(api: string, body = {}): Promise<any> {
  return fetchData('DELETE', api, body)
}

/**
 * Download data from server
 * @param api - the api to call
 * @returns the Promise<Blob> to download the data
 */
export async function downloadData(api: string): Promise<Blob> {
  return fetchData('GET', api).then((response) => response.blob())
}

/**
 * Read data from server
 * @param api - the api to call
 * @returns the Promise<string> to read the data
 */
export async function plainData(api: string): Promise<string> {
  return fetchData('GET', api).then((response) => response.text())
}
