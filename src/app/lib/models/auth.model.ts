export interface AuthParams {
  username: string
  password: string
}

export interface Session {
  authenticated: boolean
  session: 'basic' | 'cookie' | 'legacy'
  user: {
    username: string
  }
}
