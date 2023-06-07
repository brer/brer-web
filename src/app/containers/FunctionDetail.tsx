import { useEffect, useState } from 'react'
import {
  ArrowPathIcon,
  CubeTransparentIcon,
  ExclamationCircleIcon,
  InboxIcon,
} from '@heroicons/react/20/solid'
import { saveAs } from 'file-saver'

import { Fn } from '../lib/models/function.model'
import Button from '../components/Button'
import InvocationsList from './InvocationsList'
import InvocationDetail from './InvocationDetail'
import {
  Invocation,
  InvocationSearchParams,
} from '../lib/models/invocation.model'
import {
  downloadInvocationPayload,
  readInvocationLogs,
  searchInvocations,
} from '../lib/services/invocations.service'
import { formatDate } from '../lib/utilities/date.lib'
import { ModalParams } from '../components/Modal'
import InvocationLogs from './InvocationLogs'

interface FunctionDetailParams {
  fn: Fn
  onCloseFunction: () => void
  onModalShow: (modalParams: ModalParams) => void
}

export default function FunctionDetail({
  fn,
  onCloseFunction,
  onModalShow,
}: FunctionDetailParams) {
  const [invocations, setInvocations] = useState<Invocation[] | undefined>()
  const [currentInvocation, setCurrentInvocation] = useState<
    Invocation | undefined
  >()
  const [continueString, setContinueString] = useState<string | undefined>()
  const [showEnvs, setShowEnvs] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFunctionLoading, setisFunctionLoading] = useState(false)
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
  const handleLogInvocation = (invocation: Invocation) => {
    setisFunctionLoading(true)
    readInvocationLogs(invocation._id!)
      .then((logs) =>
        onModalShow({
          title: `Log ${invocation.functionName}`,
          children: InvocationLogs({ logs, invocation }),
        })
      )
      .finally(() => setisFunctionLoading(false))
  }
  const handlePayloadInvocation = (invocation: Invocation) => {
    setisFunctionLoading(true)
    downloadInvocationPayload(invocation._id!)
      .then((res) => saveAs(res, 'payload.json'))
      .finally(() => setisFunctionLoading(false))
  }

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
        isLoading={isFunctionLoading}
        showEnvs={showEnvs}
        onCloseFunction={onCloseFunction}
        onToggleEnvFunction={handleToggleEnvs}
      ></Header>
      <FunctionInvocations
        isLoading={isLoading}
        isFunctionLoading={isFunctionLoading}
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
  isLoading: boolean
  onCloseFunction: () => void
  onToggleEnvFunction: (show: boolean) => void
}

function Header({
  fn,
  showEnvs,
  isLoading,
  onCloseFunction,
  onToggleEnvFunction,
}: HeaderParams) {
  const createdAt = fn.createdAt ? formatDate(fn.createdAt) : undefined
  const updatedAt = fn.updatedAt ? formatDate(fn.updatedAt) : undefined

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
        {!isLoading && (
          <div className="flex">
            <Button
              className="ml-2"
              style={showEnvs ? 'solid' : 'outline'}
              size="m"
              onClick={() => onToggleEnvFunction(!showEnvs)}
              icon="adjustments"
              title={showEnvs ? 'Hide ENVs' : 'Show ENVs'}
              disabled={!fn.env || !fn.env.length}
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
        )}
        {isLoading && <ArrowPathIcon className="h-6 animate-spin" />}
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
  isFunctionLoading: boolean
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
  isFunctionLoading,
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
      <div className="w-full overflow-hidden">
        {currentInvocation ? (
          <InvocationDetail
            invocation={currentInvocation}
            isLoading={isFunctionLoading}
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
