import { useEffect, useState } from 'react'
import { Fn } from '../lib/models/function.model'
import { Invocation } from '../lib/models/invocation.model'
import { searchFunctionInvocations } from '../lib/services/functions.service'
import InvocationsList from './InvocationsList'
import {
  ArrowPathIcon,
  CubeTransparentIcon,
  ExclamationCircleIcon,
  InboxIcon,
} from '@heroicons/react/20/solid'
import Button from '../components/Button'
import InvocationDetail from './InvocationDetail'

interface FunctionDetailParams {
  fn: Fn
  onCloseFunction: () => void
}

export default function FunctionDetail({
  fn,
  onCloseFunction,
}: FunctionDetailParams) {
  const [invocations, setInvocations] = useState<Invocation[] | undefined>()
  const [currentInvocation, setCurrentInvocation] = useState<
    Invocation | undefined
  >()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // Handlers
  const searchInvocations = () => {
    if (!fn._id) {
      return
    }

    setCurrentInvocation(undefined)
    setIsLoading(true)
    setIsError(false)
    searchFunctionInvocations(fn.name)
      .then((invocations) => setInvocations(invocations))
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false))
  }
  const handleSelectInvocation = (invocation: Invocation) =>
    setCurrentInvocation(invocation)
  const handleUnselectInvocation = () => setCurrentInvocation(undefined)
  const handlePlayInvocation = (invocation: Invocation) =>
    console.log(invocation)
  const handleLogInvocation = (invocation: Invocation) =>
    console.log(invocation)
  const handlePayloadInvocation = (invocation: Invocation) =>
    console.log(invocation)

  // Lifecycle
  useEffect(() => searchInvocations(), [fn.name])

  return (
    <div className="flex flex-col h-full w-full">
      <Header fn={fn} onCloseFunction={onCloseFunction}></Header>
      <FunctionInvocations
        isLoading={isLoading}
        isError={isError}
        invocations={invocations}
        onSelectInvocation={handleSelectInvocation}
        onUnselectInvocation={handleUnselectInvocation}
        onPlayInvocation={handlePlayInvocation}
        onLogInvocation={handleLogInvocation}
        onPayloadInvocation={handlePayloadInvocation}
        currentInvocation={currentInvocation}
      ></FunctionInvocations>
    </div>
  )
}

interface HeaderParams {
  fn: Fn
  onCloseFunction: () => void
}

function Header({ fn, onCloseFunction }: HeaderParams) {
  return (
    <div className="border-b p-8">
      <div className="flex justify-between">
        <h1
          className="text-2xl font-bold text-yellow-800 truncate whitespace-nowrap"
          title={fn.name}
        >
          {fn.name}
        </h1>
        <Button
          className="ml-2"
          style="outline"
          size="m"
          onClick={onCloseFunction}
          icon="x-mark"
        ></Button>
      </div>
      <p className="text-gray-400 text-sm">
        <strong>IMAGE</strong> {fn.image}
      </p>
      <p className="text-gray-400 text-sm">
        <strong>ENV</strong>
      </p>
    </div>
  )
}

interface FunctionInvocationsParams {
  invocations?: Invocation[]
  isLoading: boolean
  isError: boolean
  currentInvocation?: Invocation
  onPlayInvocation: (Invocation: Invocation) => void
  onSelectInvocation: (invocation: Invocation) => void
  onLogInvocation: (invocation: Invocation) => void
  onPayloadInvocation: (invocation: Invocation) => void
  onUnselectInvocation: () => void
}

function FunctionInvocations({
  invocations,
  isLoading,
  isError,
  currentInvocation,
  onPlayInvocation,
  onSelectInvocation,
  onLogInvocation,
  onPayloadInvocation,
  onUnselectInvocation,
}: FunctionInvocationsParams) {
  const wrapperClasses =
    isLoading || isError || !invocations?.length
      ? 'flex flex-col items-center justify-center grow h-full'
      : 'flex flex-col h-full'

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
        <InboxIcon className="h-24" />
        <h2>No invocations avaialable!</h2>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full">
      <div className="w-1/4 border-r">
        <InvocationsList
          isLoading={isLoading}
          isError={isError}
          invocations={invocations}
          currentId={currentInvocation?._id}
          onSelectFunction={onSelectInvocation}
        ></InvocationsList>
      </div>
      <div className="w-full">
        {currentInvocation ? (
          <InvocationDetail
            invocation={currentInvocation}
            onPlayFunction={() => onPlayInvocation(currentInvocation)}
            onCloseFunction={onUnselectInvocation}
            onPayloadFunction={() => onPayloadInvocation(currentInvocation)}
            onLogFunction={() => onLogInvocation(currentInvocation)}
          ></InvocationDetail>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <CubeTransparentIcon className="h-24 w-24 mb-2" />
            <h3>Select an invocation</h3>
          </div>
        )}
      </div>
    </div>
  )
}
