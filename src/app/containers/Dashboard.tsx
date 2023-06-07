'use client'
import { useEffect, useState } from 'react'
import { CubeIcon } from '@heroicons/react/20/solid'

import { Fn, FnSearchParams } from '../lib/models/function.model'
import {
  createFunction,
  searchFunctions,
} from '../lib/services/functions.service'

import Logo from '../components/Logo'
import Button from '../components/Button'
import Input from '../components/Input'
import FunctionsList from './FunctionsList'
import FunctionDetail from './FunctionDetail'
import Modal from '../components/Modal'
import FunctionForm from './FunctionForm'

export default function Dashboard() {
  // Models
  const [searchName, setSearchName] = useState<string | undefined>()
  const [functions, setFunctions] = useState<Fn[] | undefined>()
  const [currentFunction, setCurrentFunction] = useState<Fn | undefined>()
  const [continueString, setContinueString] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // Handlers
  const searchFns = (loadMore = false) => {
    setIsLoading(true)
    setIsError(false)
    searchFunctions(parseSearchParams(loadMore))
      .then((fns) => {
        setContinueString(fns.continue)
        setFunctions([...(functions || []), ...fns.functions])
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false))
  }
  const createFn = (fn: Partial<Fn>) => {
    if (!fn.name || !fn.image) {
      return
    }

    setIsLoading(true)
    createFunction({
      name: fn.name,
      image: fn.image,
      env: fn.env || [],
    })
      .then((fn) => searchFns(true))
      .finally(() => setIsLoading(false))
  }
  const handleSearchFunctions = (text: string | undefined) => {
    setSearchName(text)
  }
  const handleSelectFunction = (fn: Fn) => setCurrentFunction(fn)
  const handleUnselectFunction = () => setCurrentFunction(undefined)

  // Lifecycle
  useEffect(() => searchFns(), [])

  // Utilities
  const parseSearchParams = (loadMore: boolean) => {
    const params: FnSearchParams = {}

    if (searchName) {
      params.name = searchName
    }

    if (loadMore && continueString) {
      params.continue = continueString
    }

    return params
  }

  return (
    <div className="bg-white rounded-xl h-full w-full flex flex-row drop-shadow-md hover:drop-shadow-2xl transition duration-150">
      <div className="w-1/3 max-w-xs shadow-xl flex flex-col">
        <Header
          onCreateFunction={createFn}
          onSearchFunctions={handleSearchFunctions}
        ></Header>
        <FunctionsList
          functions={functions?.filter((f) =>
            searchName ? f.name.includes(searchName) : true
          )}
          isLoading={isLoading}
          isError={isError}
          currentId={currentFunction?._id}
          showLoadMore={!!continueString && !searchName}
          onSelectFunction={handleSelectFunction}
          onLoadMoreFunction={() => searchFns(true)}
        ></FunctionsList>
      </div>
      <div className="w-full overflow-hidden">
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
  onCreateFunction: (fn: Partial<Fn>) => void
  onSearchFunctions: (text: string | undefined) => void
}

function Header({ onCreateFunction, onSearchFunctions }: HeaderParams) {
  const [modal, setModal] = useState(false)
  const [editFunction, setEditFunction] = useState<Partial<Fn>>({})

  return (
    <div className="border-b">
      <div className="flex p-3 flex-row justify-between items-center">
        <Logo />
        <Button
          size="m"
          style="solid"
          icon="plus"
          onClick={() => {
            setEditFunction({})
            setModal(true)
          }}
        >
          New function
        </Button>
        <Modal
          isVisible={modal}
          title="New function"
          actions={[
            {
              label: 'Save',
              actionId: 'save',
              callback: (actionId) => {
                onCreateFunction(editFunction)
                setModal(false)
              },
            },
          ]}
          onDismiss={() => setModal(false)}
        >
          <FunctionForm
            fn={editFunction}
            showName={true}
            onFnChange={setEditFunction}
            onFieldChange={(field, value) => {
              editFunction[field] = value
              setEditFunction(editFunction)
            }}
          ></FunctionForm>
        </Modal>
      </div>
      <div className="p-3">
        <Input
          placeholder="Search functions"
          icon="lens"
          onChange={onSearchFunctions}
        ></Input>
      </div>
    </div>
  )
}
