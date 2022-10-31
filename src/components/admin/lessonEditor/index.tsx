import { ArrowDownIcon, ArrowUpIcon, PlusIcon } from '@heroicons/react/24/solid'

import { TrashIcon } from '@heroicons/react/24/outline'
import CodeLesson from 'server/entities/codeLesson'
import Module from 'server/entities/module'
import QuizLesson from 'server/entities/quizLesson'
import { CodeLessonEditor } from '../codeLessonEditor'
import { QuizLessonEditor } from '../quizLessonEditor'

function emptyCodeLesson(): CodeLesson {
  return {
    id: Math.random().toString(),
    type: 'code',
    solution: {
      code: '',
      language: '',
      text: '',
    },
    template: {
      code: '',
      language: '',
    },
    tests: [],
    text: 'string',
  }
}

function emptyQuizLesson(): QuizLesson {
  return {
    id: Math.random().toString(),
    type: 'quiz',
    text: '',
    alternatives: [],
    solution: {
      text: '',
      correct: [],
    },
  }
}

interface LessonEditorProps {
  lesson: CodeLesson | QuizLesson
  updateLesson: (lesson: CodeLesson | QuizLesson) => void
  module: Module
  setModule: (module: Module) => void
}

export function LessonEditor({
  lesson,
  updateLesson,
  module,
  setModule,
}: LessonEditorProps) {
  function handleMoveLessonForward() {
    const index = module.lessons.findIndex(({ id }) => id === lesson.id)
    if (index === module.lessons.length - 1) return
    module.lessons.splice(index, 1)
    module.lessons.splice(index + 1, 0, lesson)
    setModule({ ...module })
  }

  function handleMoveLessonBackward() {
    const index = module.lessons.findIndex(({ id }) => id === lesson.id)
    if (index === 0) return
    module.lessons.splice(index, 1)
    module.lessons.splice(index - 1, 0, lesson)
    setModule({ ...module })
  }

  function handleRemoveLesson() {
    module.lessons = module.lessons.filter(({ id }) => id !== lesson.id)
    setModule({ ...module })
  }

  function handleAddLessonAfter(newLesson: CodeLesson | QuizLesson) {
    module.lessons.splice(
      module.lessons.findIndex(({ id }) => id === lesson.id) + 1,
      0,
      newLesson,
    )
    setModule({ ...module })
  }

  return (
    <div className="rounded-lg border p-4 shadow-md">
      <div className="flex justify-end">
        <div className="inline-flex">
          <button
            onClick={() => handleAddLessonAfter(emptyQuizLesson())}
            className="flex items-center rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="ml-2">quiz</span>
          </button>
          <button
            onClick={() => handleAddLessonAfter(emptyCodeLesson())}
            className="flex items-center border border-t border-b border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="ml-2">código</span>
          </button>
          <button
            onClick={handleRemoveLesson}
            className="flex items-center border border-t border-b border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleMoveLessonBackward}
            className="flex items-center border border-t border-b border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
          >
            <ArrowUpIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleMoveLessonForward}
            className="flex items-center rounded-r-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
          >
            <ArrowDownIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {lesson.type === 'code' && (
        <CodeLessonEditor
          setCodeLesson={updateLesson}
          codeLesson={lesson as CodeLesson}
        />
      )}
      {lesson.type === 'quiz' && (
        <QuizLessonEditor
          setQuizLesson={updateLesson}
          quizLesson={lesson as QuizLesson}
        />
      )}
    </div>
  )
}
