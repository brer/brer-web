'use client'
import { useEffect, useState } from 'react'
import { CubeIcon } from '@heroicons/react/20/solid'

import { Fn, FnSearchParams } from '../lib/models/function.model'
import {
  createFunction,
  searchFunctions,
} from '../lib/services/functions.service'
import { createSession, getSession } from '../lib/services/auth.service'

import Logo from '../components/Logo'
import Button from '../components/Button'
import Input from '../components/Input'
import FunctionsList from './FunctionsList'
import FunctionDetail from './FunctionDetail'
import Modal from '../components/Modal'
import AuthForm from './AuthForm'
import FunctionForm from './FunctionForm'
import { AuthParams } from '../lib/models/auth.model'
import Select from '../components/Select'

export default function Dashboard() {
  // Models
  const [searchName, setSearchName] = useState<string | undefined>()
  const [functions, setFunctions] = useState<Fn[] | undefined>()
  const [currentFunction, setCurrentFunction] = useState<Fn | undefined>()
  const [continueString, setContinueString] = useState<string | undefined>()
  const [authParams, setAuthParams] = useState<Partial<AuthParams>>({})
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [isAuthError, setIsAuthError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [authModal, setAuthModal] = useState(false)
  const [user, setUser] = useState<string | undefined>()
  const [currentProject, setCurrentProject] = useState<string | undefined>()
  const [projects, setProjects] = useState<string[] | undefined>()

  // Handlers
  const initDashboard = () => {
    setIsLoading(true)
    getSession()
      .then((session) => {
        // Show auth modal if not authenticated
        if (!session.authenticated) {
          setAuthModal(true)
        } else {
          const { username, projects } = session.user
          const currentProject = projects[0]
          setUser(username)
          setProjects(projects)
          setCurrentProject(currentProject)
          searchFns({ currentProject })
        }
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false))
  }

  const searchFns = (searchParams: {
    currentProject: string
    searchName?: string
    loadMore?: boolean
    continueString?: string
  }) => {
    setIsLoading(true)
    setIsError(false)
    searchFunctions(parseSearchParams(searchParams))
      .then((fns) => {
        setContinueString(fns.continue)
        searchParams.loadMore
          ? setFunctions([...(functions || []), ...fns.functions])
          : setFunctions(fns.functions)
      })
      .catch((err) => {
        setIsError(true)
        if (err?.error?.code === 'NOT_AUTHENTICATED') {
          setAuthModal(true)
        }
      })
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
      .then(
        (fn) => currentProject && searchFns({ currentProject, loadMore: true })
      )
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false))
  }

  const authenticate = async (authParams: Partial<AuthParams>) => {
    if (!authParams.password || !authParams.username) {
      return
    }

    setIsAuthLoading(true)
    setIsAuthError(false)
    createSession(authParams as AuthParams)
      .then((session) => {
        if (session.user) {
          const { username, projects } = session.user
          const currentProject = projects[0]
          setUser(username)
          setProjects(projects)
          setCurrentProject(currentProject)
          setAuthModal(false)
          searchFns({ currentProject })
        }
      })
      .catch((err) => setIsAuthError(true))
      .finally(() => setIsAuthLoading(false))
  }

  const handleSearchFunctions = (text: string | undefined) => {
    setSearchName(text)
  }
  const handleSelectFunction = (fn: Fn) => setCurrentFunction(fn)
  const handleUnselectFunction = () => setCurrentFunction(undefined)

  // Lifecycle
  useEffect(() => initDashboard(), [])

  // Utilities
  const parseSearchParams = (searchParams: {
    currentProject: string
    searchName?: string
    loadMore?: boolean
    continueString?: string
  }) => {
    const params: FnSearchParams = {}

    if (searchParams.searchName) {
      params.name = searchParams.searchName
    }

    if (searchParams.loadMore && searchParams.continueString) {
      params.continue = searchParams.continueString
    }

    params.project = searchParams.currentProject
    return params
  }

  return (
    <div className="bg-white lg:rounded-xl flex flex-col h-full w-full drop-shadow-md hover:drop-shadow-2xl transition duration-150 overflow-hidden">
      <Header
        user={user}
        projects={projects}
        currentProject={currentProject}
        onCreateFunction={createFn}
        onChangeProject={(currentProject) => {
          setFunctions([])
          setCurrentFunction(undefined)
          setCurrentProject(currentProject)
          if (currentProject) {
            searchFns({ currentProject })
          }
        }}
      ></Header>
      <div className="flex flex-row h-full w-full overflow-hidden">
        <div className="flex flex-col w-1/4 lg:w-1/3 max-w-xs h-full border-r">
          <div className="p-3 border-b">
            <Input
              value=""
              placeholder="Search functions"
              icon="lens"
              onChange={handleSearchFunctions}
            ></Input>
          </div>
          <div className="h-full overflow-hidden">
            <FunctionsList
              functions={functions?.filter((f) =>
                searchName ? f.name.includes(searchName) : true
              )}
              isLoading={isLoading}
              isError={isError}
              currentId={currentFunction?._id}
              showLoadMore={!!continueString && !searchName}
              onSelectFunction={handleSelectFunction}
              onLoadMoreFunction={() =>
                currentProject && searchFns({ currentProject, loadMore: true })
              }
            ></FunctionsList>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          {currentFunction ? (
            <FunctionDetail
              fn={currentFunction}
              onCloseFunction={handleUnselectFunction}
              onDeleteFunction={() => {
                currentProject && searchFns({ currentProject })
                setCurrentFunction(undefined)
              }}
            ></FunctionDetail>
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <CubeIcon className="h-24 w-24 mb-2" />
              <h3>Select a function</h3>
            </div>
          )}
        </div>
      </div>
      <Modal
        isVisible={authModal}
        dismissable={false}
        actions={[
          {
            label: 'Authenticate',
            actionId: 'authenticate',
            callback: (actionId) => authenticate(authParams),
            disabled: isAuthLoading,
          },
        ]}
        onDismiss={() => setAuthModal(false)}
      >
        <AuthForm
          authParams={authParams}
          error={isAuthError}
          disabled={isAuthLoading}
          onAuthChange={setAuthParams}
          onSubmit={() => authenticate(authParams)}
        ></AuthForm>
      </Modal>
    </div>
  )
}

interface HeaderParams {
  user?: string
  currentProject?: string
  projects?: string[]
  onChangeProject: (p: string | undefined) => void
  onCreateFunction: (fn: Partial<Fn>) => void
}

function Header({
  user,
  currentProject,
  projects,
  onCreateFunction,
  onChangeProject,
}: HeaderParams) {
  const [modal, setModal] = useState(false)
  const [editFunction, setEditFunction] = useState<Partial<Fn>>({})

  return (
    <div className="flex w-full border-b p-3 flex-row justify-between items-center">
      <Logo />
      <div className="flex gap-2">
        {projects ? (
          <Select
            placeholder="Current project"
            onChange={(p) => onChangeProject(p as string | undefined)}
            value={currentProject}
            options={projects.map((p) => ({ label: p, value: p }))}
          ></Select>
        ) : (
          ''
        )}
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
      </div>
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
        ></FunctionForm>
      </Modal>
    </div>
  )
}
