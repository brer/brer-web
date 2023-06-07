import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

interface InputParams {
  placeholder: string
  onChange: (text: string | undefined) => void
  className?: string
  value?: string
  icon?: 'lens'
}

export default function Input({
  placeholder,
  icon,
  value,
  className,
  onChange,
}: InputParams) {
  const [editableText, setEditableText] = useState(value)

  // Classes
  let wrapperClasses = 'relative rounded-md'

  if (className) {
    wrapperClasses += ` ${className}`
  }

  let inputClasses =
    'appearance-none border border-black-300 text-gray-900 text-sm rounded-lg focus:border-yellow-700 focus-visible:border-yellow-700 block w-full p-2.5'
  const iconWrapperClasses =
    'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'

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
    if (event.key === 'Enter') {
      onChange(event.target.value)
    }
  }

  return (
    <div className={wrapperClasses}>
      {inputIcon}
      <input
        type="text"
        className={inputClasses}
        placeholder={placeholder}
        value={editableText || ''}
        onChange={(event) => setEditableText(event.target.value)}
        onBlur={() => onChange(editableText)}
        onKeyDown={handleKeyEvent}
      />
    </div>
  )
}
