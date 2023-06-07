import {
  ExclamationCircleIcon,
  ArrowPathIcon,
  QueueListIcon,
} from '@heroicons/react/20/solid'
import { Fn } from '../lib/models/function.model'
import FunctionItem from './FunctionItem'

interface FunctionsListParams {
  functions?: Fn[]
  currentId?: string
  isLoading: boolean
  isError: boolean
  onSelectFunction: (fn: Fn) => void
}

export default function FunctionsList({
  functions,
  currentId,
  isLoading,
  isError,
  onSelectFunction,
}: FunctionsListParams) {
  const wrapperClasses =
    isLoading || isError || !functions?.length
      ? 'flex flex-col justify-center items-center h-full'
      : 'flex flex-col h-full overflow-auto'

  if (isLoading) {
    return (
      <div className={wrapperClasses}>
        <ArrowPathIcon className="h-24 animate-spin" />
        <h2>Loading...</h2>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={wrapperClasses}>
        <ExclamationCircleIcon className="h-24" />
        <h2>Ops, something went wrong!</h2>
      </div>
    )
  }

  if (!functions?.length) {
    return (
      <div className={wrapperClasses}>
        <QueueListIcon className="h-24" />
        <h2>No functions avaialable!</h2>
      </div>
    )
  }

  return (
    <div className={wrapperClasses}>
      {functions.map((fn) => (
        <FunctionItem
          key={fn._id}
          fn={fn}
          isActive={fn._id === currentId}
          onSelectFunction={onSelectFunction}
        />
      ))}
    </div>
  )
}
