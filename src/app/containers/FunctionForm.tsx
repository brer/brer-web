import { useState } from 'react'
import Input from '../components/Input'
import { Fn } from '../lib/models/function.model'

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
    </form>
  )
}
