import { useEffect, useState } from 'react'
import { FnEnv } from '../lib/models/function.model'
import Button from '../components/Button'
import { addEnv, removeEnv } from '../lib/libs/function.lib'
import Input from '../components/Input'

interface FunctionEnvParams {
  env?: FnEnv[]
  onEnvChange: (env?: FnEnv[]) => void
}

export default function FunctionEnv({ env, onEnvChange }: FunctionEnvParams) {
  const [envEditable, setEnvEditable] = useState(env)

  // Lifecycle
  useEffect(() => setEnvEditable(env), [env])

  return (
    <div>
      {!envEditable?.length && (
        <div className="text-center">
          <Button
            className="block mx-auto"
            style="outline"
            size="m"
            onClick={() => {
              const newEnv = addEnv(envEditable)
              setEnvEditable(newEnv)
              onEnvChange(newEnv)
            }}
          >
            Add ENV
          </Button>
        </div>
      )}
      {envEditable?.map((e, index) => (
        <div key={e.name + index} className="flex mb-4">
          <div className="flex grow">
            <Input
              className="w-full mr-2"
              value={e.name}
              placeholder="Name"
              onChange={(value) => {
                if (envEditable) {
                  const newEnv = envEditable
                  newEnv[index].name = value || ''
                  onEnvChange(newEnv)
                }
              }}
            ></Input>
            <Input
              className="w-full mr-2"
              value={e.value}
              placeholder="Value"
              onChange={(value) => {
                if (envEditable) {
                  const newEnv = envEditable
                  newEnv[index].value = value || ''
                  onEnvChange(newEnv)
                }
              }}
            ></Input>
          </div>
          <div className="flex shrink">
            <Button
              className="mr-2"
              style="outline"
              size="l"
              icon="minus"
              onClick={() => {
                const newEnv = removeEnv(envEditable, index)
                setEnvEditable(newEnv)
                onEnvChange(newEnv)
              }}
            ></Button>
            <Button
              style="outline"
              size="l"
              icon="plus"
              onClick={() => {
                const newEnv = addEnv(envEditable)
                setEnvEditable(newEnv)
                onEnvChange(newEnv)
              }}
            ></Button>
          </div>
        </div>
      ))}
    </div>
  )
}
