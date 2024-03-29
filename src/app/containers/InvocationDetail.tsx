import Button from '../components/Button'
import { Invocation } from '../lib/models/invocation.model'
import InvocationStatus from './InvocationStatus'
import { formatDate } from '../lib/libs/date.lib'

interface InvocationDetailParams {
  invocation: Invocation
  isLoading: boolean
  onCloseFunction: () => void
  onPayloadFunction: () => void
  onLogFunction: () => void
  onDeleteInvocation: () => void
}

export default function InvocationDetail({
  invocation,
  isLoading,
  onCloseFunction,
  onLogFunction,
  onPayloadFunction,
  onDeleteInvocation,
}: InvocationDetailParams) {
  return (
    <div className="flex flex-col h-full">
      <Header
        invocation={invocation}
        isLoading={isLoading}
        onCloseFunction={onCloseFunction}
        onDeleteInvocation={onDeleteInvocation}
      ></Header>
      <Content invocation={invocation}></Content>
      <Footer
        isLoading={isLoading}
        onLogFunction={onLogFunction}
        onPayloadFunction={onPayloadFunction}
      ></Footer>
    </div>
  )
}

interface HeaderParams {
  invocation: Invocation
  isLoading: boolean
  onCloseFunction: () => void
  onDeleteInvocation: () => void
}

function Header({
  invocation,
  isLoading,
  onCloseFunction,
  onDeleteInvocation,
}: HeaderParams) {
  const updatedAt = invocation.updatedAt
    ? formatDate(invocation.updatedAt)
    : undefined

  return (
    <div className="pt-8 px-8 flex justify-between">
      <div className="flex flex-col">
        <h1
          className="text-2xl font-bold text-yellow-800 truncate whitespace-nowrap"
          title={invocation.functionName}
        >
          {invocation.functionName}
        </h1>
        <p className="text-gray-400 text-sm">
          <strong>ID</strong> {invocation._id}
        </p>
        {updatedAt && (
          <p className="text-gray-400 text-sm">
            <strong>UPDATED AT</strong> {updatedAt}
          </p>
        )}
      </div>
      <div className="flex justify-center items-start divide-x">
        <div>
          <InvocationStatus
            className="mr-2"
            status={invocation.status}
          ></InvocationStatus>
        </div>
        <div className="flex flex-nowrap divide-x">
          <Button
            className="ml-2"
            color="danger"
            style="solid"
            size="m"
            onClick={onDeleteInvocation}
            icon="delete"
            title="Delete invocation"
          ></Button>
          <Button
            className="ml-2"
            style="outline"
            size="m"
            onClick={onCloseFunction}
            icon="x-mark"
            disabled={isLoading}
          ></Button>
        </div>
      </div>
    </div>
  )
}

interface ContentParams {
  invocation: Invocation
}

function Content({ invocation }: ContentParams) {
  return (
    <div className="p-3 md:p-4 lg:p-8 h-full overflow-auto">
      <div>
        <p className="text-gray-400 text-sm">
          <strong>PHASES</strong>
        </p>
        <ul
          role="list"
          className="marker:text-yellow-800 list-none space-y-1 text-slate-400"
        >
          {invocation.phases.map((phase) => (
            <li className="flex items-center p-1" key={phase.status}>
              <InvocationStatus
                status={phase.status}
                showLabel={false}
              ></InvocationStatus>
              <span className="text-sm ml-2">{formatDate(phase.date)}</span>
            </li>
          ))}
        </ul>
      </div>

      {invocation.reason && (
        <div className="mt-5">
          <p className="text-gray-400 text-sm">
            <strong>REASON</strong>
          </p>
          <div className="bg-slate-800 text-white text-xs p-3 overflow-auto">
            <pre>{JSON.stringify(invocation.reason, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

interface FooterParams {
  isLoading: boolean
  onPayloadFunction: () => void
  onLogFunction: () => void
}

function Footer({ isLoading, onPayloadFunction, onLogFunction }: FooterParams) {
  return (
    <div className="pb-8 px-8 flex justify-center align-center">
      <Button
        className="mr-2"
        style="outline"
        size="m"
        onClick={onPayloadFunction}
        disabled={isLoading}
      >
        Download payload
      </Button>
      <Button
        style="outline"
        size="m"
        onClick={onLogFunction}
        disabled={isLoading}
      >
        Show logs
      </Button>
    </div>
  )
}
