import Button from './Button'

interface ModalParams {
  title?: string
  actions?: ModalAction[]
  children?: React.ReactNode
  onDismiss?: () => void
  dismissable?: boolean
  isVisible?: boolean
}

interface ModalAction {
  label: string
  actionId: string
  callback: (actionId: string) => void
  disabled?: boolean
}

export default function Modal({
  children,
  title,
  actions,
  onDismiss,
  dismissable = true,
  isVisible = false,
}: ModalParams) {
  let wrapperClasses =
    'absolute lg:rounded-xl z-50 h-full w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 bg-gray-700 bg-opacity-50'

  if (!isVisible) {
    wrapperClasses += ' hidden'
  }

  return (
    <div tabIndex={-1} aria-hidden="true" className={wrapperClasses}>
      <div className="relative m-auto max-w-2xl max-h-full bg-white rounded-lg shadow">
        {/* Header */}
        <div className="flex items-start justify-between pt-4 px-4 rounded-t">
          {title && (
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          )}
          {dismissable && (
            <Button
              icon="x-mark"
              style="link"
              onClick={() => onDismiss && onDismiss()}
              size="s"
              className="ml-auto inline-flex items-center"
            ></Button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">{children}</div>

        {/* Footer */}
        {actions && (
          <div className="flex items-center justify-center pb-6 px-6 space-x-2 rounded-b">
            {actions.map((action) => (
              <Button
                key={action.actionId}
                size="l"
                style="solid"
                onClick={() => action.callback(action.actionId)}
                disabled={action.disabled}
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
