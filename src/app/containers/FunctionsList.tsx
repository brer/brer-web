import {
  ExclamationCircleIcon,
  ArrowPathIcon,
  QueueListIcon,
} from '@heroicons/react/20/solid'
import { Fn } from '../lib/models/function.model'
import FunctionItem from './FunctionItem'
import Button from '../components/Button'

interface FunctionsListParams {
  functions?: Fn[]
  currentId?: string
  isLoading: boolean
  isError: boolean
  showLoadMore: boolean
  onSelectFunction: (fn: Fn) => void
  onLoadMoreFunction: () => void
}

export default function FunctionsList({
  functions,
  currentId,
  isLoading,
  isError,
  showLoadMore,
  onSelectFunction,
  onLoadMoreFunction,
}: FunctionsListParams) {
  let wrapperClasses = 'flex flex-col justify-center items-center h-full'

  if (isLoading && !functions?.length) {
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

  wrapperClasses = 'flex flex-col h-full overflow-auto'
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
      {showLoadMore && (
        <div className="p-3 text-center">
          <Button
            style="outline"
            size="m"
            onClick={() => !isLoading && onLoadMoreFunction()}
            disabled={isLoading}
          >
            {isLoading && <ArrowPathIcon className="h-6 animate-spin" />}
            {!isLoading && <span>Load more</span>}
          </Button>
        </div>
      )}
    </div>
  )
}
