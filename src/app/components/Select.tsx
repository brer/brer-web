import { useState } from 'react'

interface SelectParams {
  placeholder: string
  onChange: (value: string | number | undefined) => void
  onSubmit?: (value: string | number | undefined) => void
  className?: string
  value?: string | number
  options: SelectOption[]
  disabled?: boolean
  error?: boolean
}

interface SelectOption {
  label: string
  value: string | number
}

export default function Select({ onChange, value, options }: SelectParams) {
  return (
    <select
      value={value}
      onChange={(event) => {
        const newValue = event.target.value
        onChange(newValue)
      }}
      className="bg-gray-10 border border-gray-300 text-gray-600 px-1 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
    >
      {options.map(function (opt, i) {
        return (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        )
      })}
    </select>
  )
}
