'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import {
  MagnifyingGlassIcon,
  PlusIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid'
import signature from '../../public/assets/images/brer-signature.png'
import logo from '../../public/assets/images/brer-logo-bg-brown.png'
import { Fn } from '@/lib/models/function.model'
import { searchFunctions } from '@/lib/services/functions.service'

export default function Dashboard() {
  // Models
  const [searchName, setSearchName] = useState<string | undefined>()
  const [functions, setFunctions] = useState<Fn[] | undefined>()
  const [isLoading, setLoading] = useState(false)
  const [serverError, setServerError] = useState()

  // Handlers
  const searchFns = () => {
    setLoading(true)
    searchFunctions(searchName)
      .then((fns) => setFunctions(fns))
      .catch((err) => setServerError(err))
      .finally(() => setLoading(false))
  }

  // Lifecycle
  useEffect(() => searchFns(), [])

  return (
    <div className="bg-white rounded-xl h-full w-full flex flex-row overflow-hidden drop-shadow-md hover:drop-shadow-2xl transition duration-150">
      <div className="w-1/3 max-w-xs shadow-xl flex flex-col">
        <div className="border-b">
          <div className="flex p-3 flex-row justify-between items-center">
            <div className="flex flex-row justify-between items-center">
              <Image className="w-8 h-8 rounded mr-2" src={logo} alt="" />
              <Image className="h-4 w-auto" src={signature} alt="" />
            </div>
            <button className="inline-flex items-center px-2 py-1 text-sm font-medium rounded-md bg-yellow-800 text-white text-xs hover:bg-yellow-900 active:bg-yellow-950 focus:outline-none focus:ring focus:ring-yellow-700 nowrap flex-nowrap">
              <PlusIcon className="mr-1 h-6" />{' '}
              <span className="whitespace-nowrap">New function</span>
            </button>
          </div>
          <div className="p-3">
            <div className="relative rounded-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-6" />
              </div>
              <input
                type="text"
                className="border border-black-300 text-gray-900 text-sm rounded-lg focus:border-black-800 block w-full p-2.5 pl-12"
                placeholder="Search functions"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center h-full">
          <ExclamationCircleIcon className="h-24" />
          <h2>Ops, something went wrong!</h2>
        </div>
      </div>
    </div>
  )
}
