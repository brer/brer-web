import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import {
  ArrowPathIcon,
  CubeTransparentIcon,
  ExclamationCircleIcon,
  InboxIcon,
} from '@heroicons/react/20/solid'

import { Fn } from '../lib/models/function.model'
import Button from '../components/Button'
import InvocationsList from './InvocationsList'
import InvocationDetail from './InvocationDetail'
import {
  Invocation,
  InvocationSearchParams,
} from '../lib/models/invocation.model'
import { searchInvocations } from '../lib/services/invocations.service'

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
  const [continueString, setContinueString] = useState<string | undefined>()
  const [showEnvs, setShowEnvs] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // Handlers
  const searchInvs = () => {
    if (!fn._id) {
      return
    }

    setCurrentInvocation(undefined)
    setIsLoading(true)
    setIsError(false)
    searchInvocations(parseSearchParams())
      .then((invs) => {
        setInvocations(invs.invocations)
        setContinueString(invs.continue)
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false))
  }
  const handleSelectInvocation = (invocation: Invocation) =>
    setCurrentInvocation(invocation)
  const handleUnselectInvocation = () => setCurrentInvocation(undefined)
  const handleToggleEnvs = (show: boolean) => setShowEnvs(show)
  const handlePlayInvocation = (invocation: Invocation) =>
    console.log(invocation)
  const handleLogInvocation = (invocation: Invocation) =>
    console.log(invocation)
  const handlePayloadInvocation = (invocation: Invocation) =>
    console.log(invocation)

  // Lifecycle
  useEffect(() => searchInvs(), [fn.name])

  // Utilities
  const parseSearchParams = () => {
    const params: InvocationSearchParams = {
      sort: 'createdAt',
      direction: 'desc',
    }

    if (fn.name) {
      params.functionName = fn.name
    }

    if (continueString) {
      params.continue = continueString
    }

    return params
  }

  return (
    <div className="flex flex-col h-full w-full">
      <Header
        fn={fn}
        showEnvs={showEnvs}
        onCloseFunction={onCloseFunction}
        onToggleEnvFunction={handleToggleEnvs}
      ></Header>
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
  showEnvs: boolean
  onCloseFunction: () => void
  onToggleEnvFunction: (show: boolean) => void
}

function Header({
  fn,
  showEnvs,
  onCloseFunction,
  onToggleEnvFunction,
}: HeaderParams) {
  const createdAt = fn.createdAt
    ? format(new Date(fn.createdAt), 'dd MMM yy, HH:mm:SS')
    : undefined
  const updatedAt = fn.updatedAt
    ? format(new Date(fn.updatedAt), 'dd MMM yy, HH:mm:SS')
    : undefined

  return (
    <div className="border-b p-8">
      <div className="flex justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-yellow-800 truncate whitespace-nowrap"
            title={fn.name}
          >
            {fn.name}
          </h1>
          <p className="text-gray-400 text-sm">
            <strong>IMAGE</strong> {fn.image}
          </p>
        </div>
        <div className="flex">
          <Button
            className="ml-2"
            style={showEnvs ? 'solid' : 'outline'}
            size="m"
            onClick={() => onToggleEnvFunction(!showEnvs)}
            icon="adjustments"
            title={showEnvs ? 'Hide ENVs' : 'Show ENVs'}
          ></Button>
          <Button
            className="ml-2"
            style="outline"
            size="m"
            onClick={onCloseFunction}
            icon="x-mark"
            title="Close function"
          ></Button>
        </div>
      </div>
      {createdAt && (
        <p className="text-gray-400 text-sm">
          <strong>CREATED AT</strong> {createdAt}
        </p>
      )}
      {updatedAt && (
        <p className="text-gray-400 text-sm">
          <strong>UPDATED AT</strong> {updatedAt}
        </p>
      )}
      {fn.env && showEnvs && (
        <div>
          <hr className="my-4"></hr>
          <table className="table-auto">
            <tbody>
              {fn.env
                .filter((env) => !!env.value)
                .map((env) => (
                  <tr key={env.name}>
                    <td className="pr-2">
                      <strong>{env.name}</strong>
                    </td>
                    <td className="pl-2">{env.value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
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
    <div className="flex h-full w-full overflow-hidden">
      <div className="w-1/4 border-r min-w-[250px]">
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
