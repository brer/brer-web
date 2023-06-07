'use client'
import { useState } from 'react'

import { Modal, ModalParams } from './components/Modal'
import Dashboard from './containers/Dashboard'

export default function Home() {
  // Models
  const [modal, setModal] = useState<ModalParams | undefined>(undefined)

  // Handlers
  const handleModalFunction = (modalParams: ModalParams) =>
    setModal(modalParams)

  return (
    <main className="h-screen w-screen p-16 flex">
      <Dashboard onModalShow={handleModalFunction}></Dashboard>
      {modal && (
        <Modal
          title={modal.title}
          actions={modal.actions}
          onDismiss={() => {
            modal.onDismiss && modal.onDismiss()
            setModal(undefined)
          }}
        >
          {modal.children}
        </Modal>
      )}
    </main>
  )
}
