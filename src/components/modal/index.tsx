interface ModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children?: React.ReactNode
  title: string
}

function Modal({ isOpen, setIsOpen, children, title }: ModalProps) {
  return (
    <div
      className={`fixed top-0 right-0 left-0 z-50 h-screen w-full overflow-y-auto overflow-x-hidden bg-gray-200/50 p-4 ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="relative mx-auto h-full w-1/3">
        <div className="relative rounded-lg bg-white shadow">
          <div className="flex items-start justify-between rounded-t border-b p-4">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              type="button"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="space-y-6 p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
