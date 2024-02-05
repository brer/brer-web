import { useEffect, useState } from 'react'
import {
  ArrowPathIcon,
  CubeTransparentIcon,
  ExclamationCircleIcon,
  InboxIcon,
} from '@heroicons/react/20/solid'
import { saveAs } from 'file-saver'

import { Fn, FnTriggerParams } from '../lib/models/function.model'
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
import { formatDate } from '../lib/libs/date.lib'
import InvocationLogs from './InvocationLogs'
import {
  deleteFunction,
  triggerFunction,
} from '../lib/services/functions.service'
import Modal from '../components/Modal'
import FunctionTrigger from './FunctionTrigger'

interface FunctionDetailParams {
  fn: Fn
  onCloseFunction: () => void
  onDeleteFunction: () => void
}

export default function FunctionDetail({
  fn,
  onCloseFunction,
  onDeleteFunction,
}: FunctionDetailParams) {
  const [invocations, setInvocations] = useState<Invocation[] | undefined>()
  const [currentInvocation, setCurrentInvocation] = useState<
    Invocation | undefined
  >()
  const [continueString, setContinueString] = useState<string | undefined>()
  const [showEnvs, setShowEnvs] = useState<boolean>(false)
  const [invocationLogs, setInvocationLogs] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [isFunctionLoading, setIsFunctionLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // Handlers
  const searchInvs = (loadMore = false) => {
    if (!fn._id) {
      return
    }

    setCurrentInvocation(undefined)
    setIsLoading(true)
    setIsError(false)
    searchInvocations(parseSearchParams(loadMore))
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
  const handlePlayInvocation = (params: FnTriggerParams, file?: File) => {
    setIsFunctionLoading(true)
    triggerFunction(fn.name, params, file)
      .then(() => searchInvs())
      .finally(() => setIsFunctionLoading(false))
  }
  const handleLogInvocation = (invocation: Invocation) => {
    setIsFunctionLoading(true)
    readInvocationLogs(invocation._id!)
      .then((logs) => setInvocationLogs(logs))
      .finally(() => setIsFunctionLoading(false))
  }
  const handlePayloadInvocation = (invocation: Invocation) => {
    setIsFunctionLoading(true)
    downloadInvocationPayload(invocation._id!)
      .then((res) => saveAs(res, 'payload.json'))
      .finally(() => setIsFunctionLoading(false))
  }
  const handleDeleteFunction = () => {
    if (fn.name) {
      setIsFunctionLoading(true)
      deleteFunction(fn.name)
        .then(() => onDeleteFunction())
        .finally(() => setIsFunctionLoading(false))
    }
  }

  // Lifecycle
  useEffect(() => searchInvs(), [fn.name])

  // Utilities
  const parseSearchParams = (loadMore: boolean) => {
    const params: InvocationSearchParams = {
      sort: 'createdAt',
      direction: 'desc',
    }

    if (fn.name) {
      params.functionName = fn.name
    }

    if (loadMore && continueString) {
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
        onPlayFunction={handlePlayInvocation}
        onReloadFunction={() => searchInvs()}
        onCloseFunction={onCloseFunction}
        onDeleteFunction={handleDeleteFunction}
        onToggleEnvFunction={handleToggleEnvs}
      ></Header>
      <FunctionInvocations
        isLoading={isLoading}
        isFunctionLoading={isFunctionLoading}
        isError={isError}
        invocations={invocations}
        onSelectInvocation={handleSelectInvocation}
        onUnselectInvocation={handleUnselectInvocation}
        onLogInvocation={handleLogInvocation}
        onPayloadInvocation={handlePayloadInvocation}
        currentInvocation={currentInvocation}
      ></FunctionInvocations>
      {currentInvocation && (
        <Modal
          title={`Log ${currentInvocation.functionName}`}
          isVisible={!!invocationLogs}
          onDismiss={() => setInvocationLogs(undefined)}
        >
          <InvocationLogs
            invocation={currentInvocation}
            logs={invocationLogs || ''}
          ></InvocationLogs>
        </Modal>
      )}
    </div>
  )
}

interface HeaderParams {
  fn: Fn
  showEnvs: boolean
  isLoading: boolean
  onPlayFunction: (params: FnTriggerParams, file?: File) => void
  onReloadFunction: () => void
  onCloseFunction: () => void
  onToggleEnvFunction: (show: boolean) => void
  onDeleteFunction: () => void
}

function Header({
  fn,
  showEnvs,
  isLoading,
  onPlayFunction,
  onReloadFunction,
  onCloseFunction,
  onToggleEnvFunction,
  onDeleteFunction,
}: HeaderParams) {
  const [modal, setModal] = useState(false)
  const [triggerParams, setTriggerParams] = useState<FnTriggerParams>({})
  const [triggerFile, setTriggerFile] = useState<File | undefined>()
  const createdAt = fn.createdAt ? formatDate(fn.createdAt) : undefined
  const updatedAt = fn.updatedAt ? formatDate(fn.updatedAt) : undefined

  return (
    <div className="border-b p-8">
      <div className="flex justify-between items-start">
        <h1
          className="text-2xl font-bold text-yellow-800 truncate whitespace-nowrap"
          title={fn.name}
        >
          {fn.name}
        </h1>

        {!isLoading && (
          <div className="flex flex-nowrap divide-x">
            <div className="flex flex-nowrap">
              <Button
                className="mr-2"
                style="solid"
                size="m"
                onClick={() => {
                  setTriggerParams({})
                  setModal(true)
                }}
                icon="play"
                title="Play function"
              ></Button>
              <Button
                className="mr-2"
                color="danger"
                style="solid"
                size="m"
                onClick={onDeleteFunction}
                icon="delete"
                title="Delete function"
              ></Button>
            </div>
            <div className="flex flex-nowrap">
              <Button
                className="ml-2 mr-1"
                style={showEnvs ? 'solid' : 'outline'}
                size="m"
                onClick={() => onToggleEnvFunction(!showEnvs)}
                icon="adjustments"
                title={showEnvs ? 'Hide ENVs' : 'Show ENVs'}
                disabled={!fn.env || !fn.env.length}
              ></Button>
              <Button
                className="mx-1"
                style="outline"
                size="m"
                onClick={onReloadFunction}
                icon="reload"
                title="Reload invocations"
              ></Button>
              <Button
                className="ml-1"
                style="outline"
                size="m"
                onClick={onCloseFunction}
                icon="x-mark"
                title="Close function"
              ></Button>
            </div>
          </div>
        )}
        {isLoading && <ArrowPathIcon className="h-6 animate-spin" />}
      </div>
      {fn.image && (
        <div className="flex gap-2">
          <p className="text-gray-400 text-sm">
            <strong>HOST</strong> {fn.image.host}
          </p>
          <p className="text-gray-400 text-sm">
            <strong>NAME</strong> {fn.image.name}
          </p>
          <p className="text-gray-400 text-sm">
            <strong>TAG</strong> {fn.image.tag}
          </p>
        </div>
      )}
      <div className="flex gap-2">
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
      </div>
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
      <Modal
        title={`Trigger ${fn.name}`}
        isVisible={!!modal}
        actions={[
          {
            label: 'Trigger function',
            actionId: 'trigger',
            callback: (actionId) => {
              onPlayFunction(triggerParams, triggerFile)
              setModal(false)
            },
          },
        ]}
        onDismiss={() => setModal(false)}
      >
        <FunctionTrigger
          params={triggerParams}
          onParamsChange={setTriggerParams}
          onFileChange={setTriggerFile}
        ></FunctionTrigger>
      </Modal>
    </div>
  )
}

interface FunctionInvocationsParams {
  invocations?: Invocation[]
  isLoading: boolean
  isFunctionLoading: boolean
  isError: boolean
  currentInvocation?: Invocation
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
