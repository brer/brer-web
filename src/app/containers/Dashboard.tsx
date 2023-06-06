'use client'
import { useEffect, useState } from 'react'
import { CubeIcon } from '@heroicons/react/20/solid'

import { Fn, FnSearchParams } from '../lib/models/function.model'
import { searchFunctions } from '../lib/services/functions.service'

import Logo from '../components/Logo'
import Button from '../components/Button'
import Input from '../components/Input'
import FunctionsList from './FunctionsList'
import FunctionDetail from './FunctionDetail'

export default function Dashboard() {
  // Models
  const [searchName, setSearchName] = useState<string | undefined>()
  const [functions, setFunctions] = useState<Fn[] | undefined>()
  const [currentFunction, setCurrentFunction] = useState<Fn | undefined>()
  const [continueString, setContinueString] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // Handlers
  const searchFns = () => {
    setIsLoading(true)
    setIsError(false)
    searchFunctions(parseSearchParams())
      .then((fns) => {
        setContinueString(fns.continue)
        setFunctions(fns.functions)
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false))
  }
  const handleCreateFunction = () => {
    console.log('create function')
  }
  const handleSearchFunctions = (text: string | undefined) => {
    setSearchName(text)
  }
  const handleSelectFunction = (fn: Fn) => setCurrentFunction(fn)
  const handleUnselectFunction = () => setCurrentFunction(undefined)

  // Lifecycle
  useEffect(() => searchFns(), [])

  // Utilities
  const parseSearchParams = () => {
    const params: FnSearchParams = {}

    if (searchName) {
      params.name = searchName
    }

    if (continueString) {
      params.continue = continueString
    }

    return params
  }

  return (
    <div className="bg-white rounded-xl h-full w-full flex flex-row overflow-hidden drop-shadow-md hover:drop-shadow-2xl transition duration-150">
      <div className="w-1/3 max-w-xs shadow-xl flex flex-col">
        <Header
          onCreateFunction={handleCreateFunction}
          onSearchFunctions={handleSearchFunctions}
        ></Header>
        <FunctionsList
          functions={functions?.filter((f) =>
            searchName ? f.name.includes(searchName) : true
          )}
          isLoading={isLoading}
          isError={isError}
          currentId={currentFunction?._id}
          onSelectFunction={handleSelectFunction}
        ></FunctionsList>
      </div>
      <div className="w-full">
        {currentFunction ? (
          <FunctionDetail
            fn={currentFunction}
            onCloseFunction={handleUnselectFunction}
          ></FunctionDetail>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <CubeIcon className="h-24 w-24 mb-2" />
            <h3>Select a function</h3>
          </div>
        )}
      </div>
    </div>
  )
}

interface HeaderParams {
  onCreateFunction: () => void
  onSearchFunctions: (text: string | undefined) => void
}

function Header({ onCreateFunction, onSearchFunctions }: HeaderParams) {
  return (
    <div className="border-b">
      <div className="flex p-3 flex-row justify-between items-center">
        <Logo />
        <Button size="m" style="solid" icon="plus" onClick={onCreateFunction}>
          New function
        </Button>
      </div>
      <div className="p-3">
        <Input
          placeholder="Search functions"
          icon="lens"
          value=""
          onChange={onSearchFunctions}
        ></Input>
      </div>
    </div>
  )
}
