import {
  PlayIcon,
  PlusIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  MinusIcon,
} from '@heroicons/react/20/solid'

interface ButtonParams {
  size: 'xs' | 's' | 'm' | 'l' | 'xl'
  style: 'solid' | 'outline' | 'link'
  onClick: () => void
  className?: string
  children?: React.ReactNode
  icon?: 'plus' | 'minus' | 'x-mark' | 'play' | 'adjustments' | 'reload'
  title?: string
  disabled?: boolean
}

export default function Button({
  size,
  icon,
  style,
  children,
  className = '',
  title = '',
  onClick,
  disabled = false,
}: ButtonParams) {
  // Classes
  let btnClasses =
    className +
    ' inline-flex nowrap flex-nowrap items-center px-2 py-1 focus:outline-none focus:ring disabled:opacity-50'

  if (style === 'solid') {
    btnClasses +=
      ' bg-yellow-800 text-white' +
      ' hover:bg-yellow-900' +
      ' active:bg-yellow-950' +
      ' active:ring-yellow-950' +
      ' focus:ring-yellow-700'
  } else if (style === 'outline') {
    btnClasses +=
      ' bg-white text-yellow-800 ' +
      ' border border-yellow-800' +
      ' hover:bg-gray-200' +
      ' active:bg-gray-300' +
      ' active:ring-yellow-950' +
      ' focus:ring-gray-400'
  } else if (style === 'link') {
    ' bg-white text-yellow-800 ' +
      ' hover:bg-gray-200' +
      ' active:bg-gray-300' +
      ' active:ring-yellow-950' +
      ' focus:ring-gray-400'
  }

  if (size === 's') {
    btnClasses += ' text-sm rounded h-6'
  } else if (size === 'm') {
    btnClasses += ' text-m rounded-md h-8'
  } else if (size === 'l') {
    btnClasses += ' text-l px-4 rounded-lg h-10'
  } else if (size === 'xl') {
    btnClasses += ' text-xl px-4 rounded-lg h-12'
  }

  // Icon
  let buttonIcon
  const iconClasses = 'h-6'

  if (icon === 'plus') {
    buttonIcon = <PlusIcon className={iconClasses} />
  } else if (icon === 'minus') {
    buttonIcon = <MinusIcon className={iconClasses} />
  } else if (icon === 'x-mark') {
    buttonIcon = <XMarkIcon className={iconClasses} />
  } else if (icon === 'play') {
    buttonIcon = <PlayIcon className={iconClasses} />
  } else if (icon === 'adjustments') {
    buttonIcon = <AdjustmentsHorizontalIcon className={iconClasses} />
  } else if (icon === 'reload') {
    buttonIcon = <ArrowPathIcon className={iconClasses} />
  }

  return (
    <button
      className={btnClasses}
      onClick={onClick}
      title={title}
      disabled={disabled}
      type="button"
    >
      {buttonIcon}
      {children && <span className="whitespace-nowrap">{children}</span>}
    </button>
  )
}
