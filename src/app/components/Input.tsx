import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'

interface InputParams {
  placeholder: string
  onChange: (text: string | undefined) => void
  onSubmit?: (text: string | undefined) => void
  className?: string
  value: string
  type?: 'text' | 'number' | 'password'
  icon?: 'lens'
  disabled?: boolean
  error?: boolean
}

export default function Input({
  placeholder,
  icon,
  value,
  className,
  type = 'text',
  onChange,
  onSubmit,
  disabled,
  error,
}: InputParams) {
  const [inputText, setInputText] = useState(value)

  // Lifecycle
  useEffect(() => setInputText(value), [value])

  // Classes
  let wrapperClasses = 'relative rounded-md'

  if (className) {
    wrapperClasses += ` ${className}`
  }

  let inputClasses =
    'appearance-none border border-black-300 text-gray-900 text-sm rounded-lg focus:border-yellow-700 focus-visible:border-yellow-700 block w-full p-2.5'
  const iconWrapperClasses =
    'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'

  if (error) {
    inputClasses += ' border-2 border-red-500'
  }

  if (!!icon) {
    inputClasses += ' pl-12'
  }

  // Icon
  const inputIcon =
    icon === 'lens' ? (
      <div className={iconWrapperClasses}>
        <MagnifyingGlassIcon className="h-6" />
      </div>
    ) : (
      ''
    )

  // Handlers
  const handleKeyEvent = (event: any) => {
    if (event.key === 'Enter' && onSubmit) {
      onSubmit(event.target.value)
    }
  }

  return (
    <div className={wrapperClasses}>
      {inputIcon}
      <input
        type={type}
        className={inputClasses}
        placeholder={placeholder}
        value={inputText}
        onChange={(event) => {
          const newText = event.target.value
          setInputText(newText)
          onChange(newText)
        }}
        onBlur={() => onChange(inputText)}
        onKeyDown={handleKeyEvent}
        disabled={disabled}
      />
    </div>
  )
}
