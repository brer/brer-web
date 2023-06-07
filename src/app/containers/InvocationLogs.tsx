import { Invocation } from '../lib/models/invocation.model'
import { formatDate } from '../lib/utilities/date.lib'

interface InvocationLogsParams {
  invocation: Invocation
  logs: string
}

export default function InvocationLogs({
  invocation,
  logs,
}: InvocationLogsParams) {
  const updatedAt = invocation.updatedAt
    ? formatDate(invocation.updatedAt)
    : undefined

  return (
    <div>
      <p className="text-gray-400 text-sm">
        <strong>ID</strong> {invocation._id}
      </p>
      {updatedAt && (
        <p className="text-gray-400 text-sm">
          <strong>UPDATED AT</strong> {updatedAt}
        </p>
      )}
      <div className="bg-slate-800 text-white text-xs p-3 mt-3 overflow-auto">
        <pre>{logs}</pre>
      </div>
    </div>
  )
}
