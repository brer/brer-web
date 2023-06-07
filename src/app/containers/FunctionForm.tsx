import { useState } from 'react'
import Input from '../components/Input'
import { Fn } from '../lib/models/function.model'
import Button from '../components/Button'
import { addFunctionEnv, removeFunctionEnv } from '../lib/libs/function.lib'

interface FunctionForm {
  fn: Partial<Fn>
  onFieldChange: (field: keyof Fn, value: any) => void
  onFnChange: (fn: Partial<Fn>) => void
  showName?: boolean
}

export default function FunctionForm({
  fn,
  showName,
  onFieldChange,
  onFnChange,
}: FunctionForm) {
  return (
    <form className="w-full">
      {showName && (
        <div className="flex flex-wrap mb-6">
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Name
            </label>
            <Input
              value={fn.name}
              placeholder="Function name"
              onChange={(value) => onFieldChange('name', value)}
            ></Input>
          </div>
        </div>
      )}
      <div className="flex flex-wrap mb-6">
        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Image
          </label>
          <Input
            value={fn.image}
            placeholder="Function image"
            onChange={(value) => onFieldChange('image', value)}
          ></Input>
        </div>
      </div>
      <div className="flex">
        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Env
          </label>
          {!fn.env?.length && (
            <div className="text-center">
              <Button
                className="block mx-auto"
                style="outline"
                size="m"
                onClick={() => onFnChange(addFunctionEnv(fn))}
              >
                Add ENV
              </Button>
            </div>
          )}
          {fn.env?.map((env, index) => (
            <div key={env.name + index} className="flex mb-4">
              <div className="flex grow">
                <Input
                  className="w-full mr-2"
                  value={env.name}
                  placeholder="Name"
                  onChange={(value) => {
                    if (fn.env) {
                      fn.env[index].name = value || ''
                    }
                  }}
                ></Input>
                <Input
                  className="w-full mr-2"
                  value={env.value}
                  placeholder="Value"
                  onChange={(value) => {
                    if (fn.env) {
                      fn.env[index].value = value || ''
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
                  onClick={() => onFnChange(removeFunctionEnv(fn, index))}
                ></Button>
                <Button
                  style="outline"
                  size="l"
                  icon="plus"
                  onClick={() => onFnChange(addFunctionEnv(fn))}
                ></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  )
}
