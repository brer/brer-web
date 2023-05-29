import { format } from 'date-fns'
import Button from '../components/Button'
import { Invocation } from '../lib/models/invocation.model'

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
  return (
    <div className="pt-8 px-8 flex justify-between">
      <h1
        className="text-2xl font-bold text-yellow-800 truncate whitespace-nowrap"
        title={invocation.functionName}
      >
        {invocation.functionName}
      </h1>
      <div className="flex">
        <div className="bg-slate-700 text-white uppercase rounded-md flex items-center justify-center px-2">
          {invocation.status}
        </div>
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
  const updatedAt = invocation.updatedAt
    ? format(new Date(invocation.updatedAt), 'dd MMM yy, HH:mm:SS')
    : undefined

  return (
    <div className="p-8 h-full">
      <p className="text-gray-400">
        <strong>ID</strong> {invocation._id}
      </p>
      {updatedAt && (
        <p className="text-gray-400">
          <strong>LAST UPDATE</strong> {updatedAt}
        </p>
      )}
      <p className="text-gray-400">
        <strong>RESULT</strong> -
      </p>
      <p className="text-gray-400">
        <strong>REASON</strong> -
      </p>
      <p className="text-gray-400">
        <strong>PHASES</strong> -
      </p>
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
