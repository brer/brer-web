import { PlayIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'

interface ButtonParams {
  size: 'xs' | 'sm' | 'm' | 'l' | 'xl'
  style: 'solid' | 'outline'
  onClick: () => void
  className?: string
  children?: React.ReactNode
  icon?: 'plus' | 'x-mark' | 'play'
}

export default function Button({
  size,
  icon,
  style,
  children,
  className = '',
  onClick,
}: ButtonParams) {
  // Classes
  let btnClasses =
    className +
    ' inline-flex nowrap flex-nowrap items-center px-2 py-1 focus:outline-none focus:ring'

  if (style === 'solid') {
    btnClasses +=
      ' bg-yellow-800 text-white ' +
      'hover:bg-yellow-900' +
      'active:bg-yellow-950' +
      'focus:ring-yellow-700'
  } else if (style === 'outline') {
    btnClasses +=
      ' bg-white text-yellow-800 ' +
      ' border border-yellow-800' +
      ' hover:bg-slate-200' +
      ' active:bg-slate-300' +
      ' focus:ring-slate-400'
  }

  if (size === 'sm') {
    btnClasses += ' text-sm rounded'
  } else if (size === 'm') {
    btnClasses += ' text-m rounded-md'
  } else if (size === 'xl') {
    btnClasses += ' text-m rounded-lg'
  }

  // Icon
  let buttonIcon

  if (icon === 'plus') {
    buttonIcon = <PlusIcon className="h-6" />
  } else if (icon === 'x-mark') {
    buttonIcon = <XMarkIcon className="h-6" />
  } else if (icon === 'play') {
    buttonIcon = <PlayIcon className="h-6" />
  }

  return (
    <button className={btnClasses} onClick={onClick}>
      {buttonIcon}
      {children && <span className="whitespace-nowrap">{children}</span>}
    </button>
  )
}
