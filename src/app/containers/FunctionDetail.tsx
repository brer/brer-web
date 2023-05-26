import { useEffect, useState } from 'react'
import { Fn } from '../lib/models/function.model'
import { Invocation } from '../lib/models/invocation.model'
import { searchFunctionInvocations } from '../lib/services/functions.service'

interface FunctionDetailParams {
  fn: Fn
  onCloseFunction: () => void
}

export default function FunctionDetail({
  fn,
  onCloseFunction,
}: FunctionDetailParams) {
  const [invocations, setInvocations] = useState<Invocation[] | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // Handlers
  const searchInvocations = () => {
    setIsLoading(true)
    setIsError(false)
    searchFunctionInvocations(fn._id!).then().catch().finally()
  }

  // Lifecycle
  useEffect(() => searchInvocations(), [])

  return (
    <div className="flex flex-column h-full">
      <Header fn={fn} onCloseFunction={onCloseFunction}></Header>
    </div>
  )
}

interface HeaderParams {
  fn: Fn
  onCloseFunction: () => void
}

function Header({ fn, onCloseFunction }: HeaderParams) {
  return (
    <div className="border-bottom">
      <h1>{fn.name}</h1>
    </div>
  )
}
