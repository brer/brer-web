import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

interface InputParams {
  placeholder: string
  onChange: (text: string) => void
  value: string
  icon?: 'lens'
}

export default function Input({
  placeholder,
  icon,
  value,
  onChange,
}: InputParams) {
  const [editableText, setEditableText] = useState(value)

  // Classes
  const inputClasses =
    'border border-black-300 text-gray-900 text-sm rounded-lg focus:border-black-800 block w-full p-2.5 pl-12'

  // Icon
  let iconWrapperClasses =
    'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'
  let inputIcon =
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
    <div className="relative rounded-md">
      {inputIcon}
      <input
        type="text"
        className={inputClasses}
        placeholder={placeholder}
        value={editableText}
        onChange={(event) => setEditableText(event.target.value)}
        onBlur={() => onChange(editableText)}
        onKeyDown={handleKeyEvent}
      />
    </div>
  )
}
