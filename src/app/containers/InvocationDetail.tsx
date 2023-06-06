import Button from '../components/Button'
import { Invocation } from '../lib/models/invocation.model'
import InvocationStatus from './InvocationStatus'
import { formatDate } from '../lib/utilities/date.lib'

interface InvocationDetailParams {
  invocation: Invocation
  onPlayFunction: () => void
  onCloseFunction: () => void
  onPayloadFunction: () => void
  onLogFunction: () => void
}

export default function InvocationDetail({
  invocation,
  onPlayFunction,
  onCloseFunction,
  onLogFunction,
  onPayloadFunction,
}: InvocationDetailParams) {
  return (
    <div className="flex flex-col h-full">
      <Header
        invocation={invocation}
        onPlayFunction={onPlayFunction}
        onCloseFunction={onCloseFunction}
      ></Header>
      <Content invocation={invocation}></Content>
      <Footer
        onLogFunction={onLogFunction}
        onPayloadFunction={onPayloadFunction}
      ></Footer>
    </div>
  )
}

interface HeaderParams {
  invocation: Invocation
  onPlayFunction: () => void
  onCloseFunction: () => void
}

function Header({ invocation, onPlayFunction, onCloseFunction }: HeaderParams) {
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
      <div className="flex justify-center items-start">
        <InvocationStatus status={invocation.status}></InvocationStatus>
        <Button
          className="ml-10"
          style="outline"
          size="m"
          onClick={onCloseFunction}
          icon="x-mark"
        ></Button>
        <Button
          className="ml-2"
          style="solid"
          size="m"
          onClick={onPlayFunction}
          icon="play"
        ></Button>
      </div>
    </div>
  )
}

interface ContentParams {
  invocation: Invocation
}

function Content({ invocation }: ContentParams) {
  return (
    <div className="p-8 h-full">
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
          <div className="bg-slate-800 text-white text-xs p-3">
            <pre>{JSON.stringify(invocation.reason, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

interface FooterParams {
  onPayloadFunction: () => void
  onLogFunction: () => void
}

function Footer({ onPayloadFunction, onLogFunction }: FooterParams) {
  return (
    <div className="pb-8 px-8 flex justify-center align-center">
      <Button
        className="mr-2"
        style="outline"
        size="m"
        onClick={onPayloadFunction}
      >
        Show payload
      </Button>
      <Button style="outline" size="m" onClick={onLogFunction}>
        Show payload
      </Button>
    </div>
  )
}
