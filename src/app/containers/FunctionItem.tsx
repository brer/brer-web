import { Fn } from '../lib/models/function.model'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

interface FunctionItemParams {
  fn: Fn
  isActive: boolean
  onSelectFunction: (fn: Fn) => void
}

export default function FunctionItem({
  fn,
  isActive,
  onSelectFunction,
}: FunctionItemParams) {
  let itemClasses =
    'p-3 border-b cursor-pointer flex flex-nowrap justify-between'

  if (isActive) {
    itemClasses += ' bg-yellow-800 text-white'
  }

  return (
    <div className={itemClasses} onClick={() => onSelectFunction(fn)}>
      <span className="truncate whitespace-nowrap">{fn.name}</span>
      <ChevronRightIcon className="h-6 w-6 ml-2 flex-none" />
    </div>
  )
}
