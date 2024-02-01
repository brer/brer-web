export interface AuthParams {
  username: string
  password: string
}

export type SessionType = 'basic' | 'cookie' | 'legacy'

export interface Session {
  authenticated: boolean
  session: SessionType
  user: {
    username: string
  }
}
