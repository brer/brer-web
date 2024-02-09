import { useEffect, useState } from 'react'
import Input from '../components/Input'
import { Fn } from '../lib/models/function.model'
import FunctionEnv from './FunctionEnv'

interface FunctionFormParams {
  fn: Partial<Fn>
  onFnChange: (fn: Partial<Fn>) => void
  showName?: boolean
}

export default function FunctionForm({
  fn,
  showName,
  onFnChange,
}: FunctionFormParams) {
  return (
    <form className="w-full">
      {showName && (
        <div className="flex flex-wrap mb-6">
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Name
            </label>
            <Input
              value={fn.name || ''}
              placeholder="Function name"
              onChange={(value) => {
                const newFn = fn
                newFn.name = value
                onFnChange(newFn)
              }}
            ></Input>
          </div>
        </div>
      )}
      {fn.image && (
        <div className="flex flex-wrap mb-6">
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Image
            </label>
            <Input
              value={fn.image.name || ''}
              placeholder="Function image"
              onChange={(name) => {
                const newFn = fn
                fn.image = { name: name || '', tag: '', host: '' }
                onFnChange(newFn)
              }}
            ></Input>
          </div>
        </div>
      )}
      <div className="flex">
        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Env
          </label>
          <FunctionEnv
            env={fn.env}
            onEnvChange={(value) => {
              const newFn = fn
              newFn.env = value
              onFnChange(newFn)
            }}
          ></FunctionEnv>
        </div>
      </div>
    </form>
  )
}
