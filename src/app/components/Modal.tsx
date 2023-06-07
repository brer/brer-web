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
          <div className="flex items-center justify-end pb-6 px-6 space-x-2 rounded-b">
            {actions.map((action) => (
              <Button
                key={action.actionId}
                size="l"
                style="solid"
                onClick={() => action.callback(action.actionId)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
