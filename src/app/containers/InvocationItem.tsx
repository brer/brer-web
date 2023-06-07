import { Invocation } from '../lib/models/invocation.model'
import { formatDate } from '../lib/utilities/date.lib'
import InvocationStatus from './InvocationStatus'
import { ChevronRightIcon } from '@heroicons/react/20/solid'

interface InvocationItemParams {
  invocation: Invocation
  isActive: boolean
  onSelectFunction: (invocation: Invocation) => void
}

export default function InvocationItem({
  invocation,
  isActive,
  onSelectFunction,
}: InvocationItemParams) {
  let itemClasses =
    'p-3 border-b cursor-pointer flex flex-nowrap items-center justify-between'
  const updatedAt = invocation.updatedAt
    ? formatDate(invocation.updatedAt)
    : undefined

  if (isActive) {
    itemClasses += ' bg-yellow-700 text-white'
  }

  return (
    <div className={itemClasses} onClick={() => onSelectFunction(invocation)}>
      <div className="flex flex-col">
        <span className="truncate whitespace-nowrap">
          {invocation.functionName}
        </span>
        {updatedAt && (
          <span className="truncate whitespace-nowrap text-xs">
            {updatedAt}
          </span>
        )}
      </div>
      <InvocationStatus
        status={invocation.status}
        showLabel={false}
      ></InvocationStatus>
      <ChevronRightIcon className="h-6 w-6 ml-2 flex-none" />
    </div>
  )
}
