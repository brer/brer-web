'use client'
import { useEffect, useState } from 'react'

import { Fn } from '@/lib/models/function.model'
import { searchFunctions } from '@/lib/services/functions.service'
import Logo from './Logo'
import Button from './ui/Button'
import Input from './ui/Input'
import FunctionsList from './FunctionsList'

export default function Dashboard() {
  // Models
  const [searchName, setSearchName] = useState<string | undefined>()
  const [functions, setFunctions] = useState<Fn[] | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // Handlers
  const searchFns = () => {
    setIsLoading(true)
    setIsError(false)
    searchFunctions(searchName)
      .then((fns) => setFunctions(fns))
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false))
  }
  const handleCreateFunction = () => {
    console.log('create function')
  }
  const handleSearchFunctions = (text: string | undefined) => {
    setSearchName(text)
    searchFns()
  }

  // Lifecycle
  useEffect(() => searchFns(), [])

  return (
    <div className="bg-white rounded-xl h-full w-full flex flex-row overflow-hidden drop-shadow-md hover:drop-shadow-2xl transition duration-150">
      <div className="w-1/3 max-w-xs shadow-xl flex flex-col">
        <Header
          onCreateFunction={handleCreateFunction}
          onSearchFunctions={handleSearchFunctions}
        ></Header>
        <FunctionsList
          functions={functions}
          isLoading={isLoading}
          isError={isError}
        ></FunctionsList>
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
        <Button size="sm" style="solid" icon="plus" onClick={onCreateFunction}>
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
