import Textarea from '../components/Textarea'
import { FnTriggerParams } from '../lib/models/function.model'
import FunctionEnv from './FunctionEnv'

interface FunctionTriggerParams {
  params: FnTriggerParams
  onParamsChange: (params: FnTriggerParams) => void
}

export default function FunctionTrigger({
  params,
  onParamsChange,
}: FunctionTriggerParams) {
  return (
    <form className="w-full">
      <div className="flex flex-wrap mb-6">
        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            JSON Params
          </label>
          <Textarea
            placeholder="JSON custom params"
            value={params.body || ''}
            onChange={(value) => {
              const newParams = params
              newParams.body = value
              onParamsChange(newParams)
            }}
            rows={3}
          ></Textarea>
        </div>
      </div>
      <div className="flex flex-wrap mb-6">
        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Custom ENV
          </label>
          <FunctionEnv
            env={[]}
            onEnvChange={(env) => {
              const newParams = params
              newParams.env = env
              onParamsChange(newParams)
            }}
          ></FunctionEnv>
        </div>
      </div>
    </form>
  )
}
