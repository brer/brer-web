import { Invocation } from '../lib/models/invocation.model'
import {
  ExclamationCircleIcon,
  ArrowPathIcon,
  QueueListIcon,
} from '@heroicons/react/20/solid'
import InvocationItem from './InvocationItem'

interface InvocationsListParams {
  invocations?: Invocation[]
  currentId?: string
  isLoading: boolean
  isError: boolean
  onSelectFunction: (invocation: Invocation) => void
}

export default function InvocationsList({
  invocations,
  currentId,
  isLoading,
  isError,
  onSelectFunction,
}: InvocationsListParams) {
  const wrapperClasses =
    isLoading || isError || !invocations?.length
      ? 'flex flex-col justify-center items-center h-full'
      : 'flex flex-col h-full overflow-auto'

  if (isLoading) {
    return (
      <div className={wrapperClasses}>
        <ArrowPathIcon className="h-24" />
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

  if (!invocations?.length) {
    return (
      <div className={wrapperClasses}>
        <QueueListIcon className="h-24" />
        <h2>No functions avaialable!</h2>
      </div>
    )
  }

  return (
    <div className={wrapperClasses}>
      {invocations.map((inv) => (
        <InvocationItem
          key={inv._id}
          invocation={inv}
          isActive={inv._id === currentId}
          onSelectFunction={onSelectFunction}
        />
      ))}
    </div>
  )
}
