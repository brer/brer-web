import { PlusIcon } from '@heroicons/react/20/solid'

interface ButtonParams {
  size: 'xs' | 'sm' | 'm' | 'l' | 'xl'
  style: 'solid' | 'outline'
  children: React.ReactNode
  onClick: () => void
  icon?: 'plus'
}

export default function Button({
  size,
  icon,
  style,
  children,
  onClick,
}: ButtonParams) {
  // Classes
  let btnClasses =
    'inline-flex nowrap flex-nowrap items-center px-2 py-1 focus:outline-none focus:ring'

  if (style === 'solid') {
    btnClasses +=
      ' bg-yellow-800 text-white ' +
      'hover:bg-yellow-900' +
      'active:bg-yellow-950' +
      'focus:ring-yellow-700'
  }

  if (size === 'sm') {
    btnClasses += ' text-sm rounded'
  } else if (size === 'm') {
    btnClasses += ' text-m rounded-md'
  } else if (size === 'xl') {
    btnClasses += ' text-m rounded-lg'
  }

  // Icon
  let buttonIcon = icon === 'plus' ? <PlusIcon className="mr-1 h-6" /> : ''

  return (
    <button className={btnClasses} onClick={onClick}>
      {buttonIcon}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  )
}
