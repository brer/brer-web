import { useEffect, useState } from 'react'

interface TextareaParams {
  rows?: number
  placeholder?: string
  onChange: (text: string | undefined) => void
  className?: string
  value: string
}

export default function Textarea({
  placeholder,
  value,
  className,
  rows = 2,
  onChange,
}: TextareaParams) {
  const [areaText, setAreaText] = useState(value)

  // Lifecycle
  useEffect(() => setAreaText(value), [value])

  // Classes
  let textAreaClasses =
    'appearance-none border border-black-300 text-gray-900 text-sm rounded-lg focus:border-yellow-700 focus-visible:border-yellow-700 block w-full p-2.5'

  if (className) {
    textAreaClasses += ` ${className}`
  }

  return (
    <textarea
      className={textAreaClasses}
      placeholder={placeholder}
      rows={rows}
      value={areaText}
      onChange={(event) => {
        const newText = event.target.value
        setAreaText(newText)
        onChange(newText)
      }}
      onBlur={() => onChange(areaText)}
    >
      {areaText}
    </textarea>
  )
}
