import Button from './Button'

export interface ModalParams {
  title?: string
  actions?: ModalAction[]
  children?: React.ReactNode
  onDismiss?: () => void
}

interface ModalAction {
  label: string
  actionId: string
  callback: (actionId: string) => void
}

export function Modal({ children, title, actions, onDismiss }: ModalParams) {
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 bg-gray-700 bg-opacity-50"
    >
      <div className="relative m-auto max-w-2xl max-h-full bg-white rounded-lg shadow">
        {/* Header */}
        <div className="flex items-start justify-between pt-4 px-4 rounded-t">
          {title && (
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          )}
          <Button
            icon="x-mark"
            style="link"
            onClick={() => onDismiss && onDismiss()}
            size="sm"
            className="ml-auto inline-flex items-center"
          ></Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">{children}</div>

        {/* Footer */}
        {actions && (
          <div className="flex items-center justify-end p-6 space-x-2 rounded-b">
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              I accept
            </button>
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
