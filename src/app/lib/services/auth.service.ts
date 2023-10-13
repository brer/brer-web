import { getData, postData } from '../libs/http.lib'
import { Session, AuthParams } from '../models/auth.model'

const API_MODEL = 'session'

/**
 * Get the current session
 * @returns the Promise<Session> for read the session
 */
export async function getSession(): Promise<Session> {
  return getData(`${API_MODEL}`)
}

/**
 * Create a new session
 * @param username - the username
 * @param password - the user password
 * @returns the Promise<Session> for create a new session and authenticate the user
 */
export async function createSession(params: AuthParams): Promise<Session> {
  return postData(`${API_MODEL}`, params)
}
