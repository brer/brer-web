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
  api: string,
  body?: any
): Promise<Response> {
  const BRER_URL = process.env.NEXT_PUBLIC_BRER_URL
  const BRER_TOKEN = process.env.NEXT_PUBLIC_BRER_TOKEN
  const API_PATH = process.env.NEXT_PUBLIC_API_PATH

  if (!BRER_URL || !BRER_TOKEN || !API_PATH) {
    throw new Error('Brer application not correctly configured')
  }

  return fetch(`${BRER_URL}/${API_PATH}/${api}`, {
    method,
    headers: {
      Authorization: `Bearer ${BRER_TOKEN}`,
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
