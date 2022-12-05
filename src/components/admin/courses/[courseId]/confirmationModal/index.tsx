import Modal from 'components/modal'
import { useRef, useState } from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  handleDeleteCourse: () => void
  slug: string
}

function ConfirmationModal({
  isOpen,
  setIsOpen,
  handleDeleteCourse,
  slug,
}: ConfirmationModalProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [showError, setShowError] = useState(false)

  const handleClick = () => {
    if (inputRef.current?.value === slug) {
      handleDeleteCourse()
    } else {
      setShowError(true)
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={`Deletar curso`}>
      <div className="grid grid-cols-1 gap-2">
        <p>
          Tem certeza que deseja deletar este curso? Esta ação não pode ser
          desfeita.
        </p>
        <p>Digite o slug do curso para confirmar</p>
        <p className="font-medium">{slug}</p>

        <input
          ref={inputRef}
          type="text"
          id="slug"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />

        <div className="mt-4">
          <button
            type="button"
            className="w-full rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
            onClick={handleClick}
          >
            Deletar curso
          </button>
        </div>
        <div>
          {showError && (
            <p className="font-medium text-red-700">
              O slug digitado não confere
            </p>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
