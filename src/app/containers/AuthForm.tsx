import Input from '../components/Input'
import { AuthParams } from '../lib/models/auth.model'

interface AuthFormParams {
  authParams: Partial<AuthParams>
  error: boolean
  disabled: boolean
  onAuthChange: (authParams: Partial<AuthParams>) => void
  onSubmit: () => void
}

export default function AuthForm({
  authParams,
  error,
  disabled,
  onAuthChange,
  onSubmit,
}: AuthFormParams) {
  return (
    <form className="w-full">
      <div className="flex flex-wrap mb-6">
        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Username
          </label>
          <Input
            value={authParams.username || ''}
            placeholder="Username"
            onChange={(value) => {
              const auth = authParams
              authParams.username = value
              onAuthChange(auth)
            }}
            error={error}
            disabled={disabled}
          ></Input>
        </div>
      </div>
      <div className="flex">
        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Password
          </label>
          <Input
            value={authParams.password || ''}
            type="password"
            placeholder="Password"
            onChange={(value) => {
              const auth = authParams
              authParams.password = value
              onAuthChange(auth)
            }}
            onSubmit={onSubmit}
            error={error}
            disabled={disabled}
          ></Input>
        </div>
      </div>
      {error && (
        <h3 className="text-red-500 text-center mt-3">INVALID CREDENTIALS</h3>
      )}
    </form>
  )
}
