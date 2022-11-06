import {FC, MouseEventHandler} from 'react';

type StudentQuizAnswerProps = {content: string, onClose: MouseEventHandler<HTMLButtonElement>}

const StudentQuizAnswer: React.FC<StudentQuizAnswerProps> = ({content, onClose = () => {}}) => {
  return (
    // <div id="popup-modal" tabIndex={-1} className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center" aria-hidden="true">
      <div className="relative py-4 w-full max-w-md h-full md:h-auto">
        <div className="container relative bg-white rounded-lg shadow dark:bg-gray-700">

          <button className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal" onClick={onClose}>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule={"evenodd"}></path>
            </svg>
              <span className="sr-only">Close modal</span>
          </button>

          <div className="p-6 text-center">
              <h2 className="mb-1 text-lg font-normal text-gray-500 dark:text-gray-400">{content}</h2>
          </div>
        </div>
      </div>
  );
}

export default StudentQuizAnswer
