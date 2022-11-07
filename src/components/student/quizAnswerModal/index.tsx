interface StudentQuizAnswerProps {
  content: string
  onClose: () => void
}

export function StudentQuizAnswer({
  content,
  onClose,
}: StudentQuizAnswerProps) {
  return (
    <div className="relative h-full w-full max-w-md py-4 md:h-auto">
      <div className="container relative rounded-lg bg-white shadow">
        <button
          className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="popup-modal"
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule={'evenodd'}
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>

        <div className="p-6 text-center">
          <h2 className="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400">
            {content}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default StudentQuizAnswer
