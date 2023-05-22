import { Fn } from '@/lib/models/function.model'
import { ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/20/solid'

interface FunctionsListParams {
  functions?: Fn[]
  isLoading: boolean
  isError: boolean
}

export default function FunctionsList({
  functions,
  isLoading,
  isError,
}: FunctionsListParams) {
  const wrapperClasses =
    isLoading || isError
      ? 'flex flex-col justify-center items-center h-full'
      : ''

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

  return <></>
}
