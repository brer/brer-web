import { InvocationStatus } from '../lib/models/invocation.model'

interface InvocationStatusParams {
  status: InvocationStatus
  className?: string
  showLabel?: boolean
}

export default function InvocationStatus({
  status,
  className,
  showLabel = true,
}: InvocationStatusParams) {
  let wrapperClasses = 'uppercase flex items-center justify-center'

  if (className) {
    wrapperClasses += ` ${className}`
  }

  if (status === 'completed') {
    wrapperClasses += ' bg-green-500 text-white'
  } else if (status === 'failed') {
    wrapperClasses += ' bg-red-500 text-white'
  } else if (status === 'initializing') {
    wrapperClasses += ' bg-yellow-400 text-black'
  } else if (status === 'pending') {
    wrapperClasses += ' bg-gray-500 text-white'
  } else if (status === 'running') {
    wrapperClasses += ' bg-orange-500 text-white'
  } else {
    wrapperClasses += ' bg-slate-700 text-white'
  }

  wrapperClasses += showLabel
    ? ' rounded-md px-2 py-1'
    : ' h-4 w-4 rounded-full'

  return <div className={wrapperClasses}>{showLabel && status}</div>
}
