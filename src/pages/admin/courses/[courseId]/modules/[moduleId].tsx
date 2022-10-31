import {
  CodeBracketIcon,
  DocumentCheckIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CodeLesson from 'server/entities/codeLesson'
import Module from 'server/entities/module'
import QuizLesson from 'server/entities/quizLesson'
import { client, trpc } from 'utils/trpc'
import { LessonEditor } from 'components/admin/lessonEditor'

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

function EditModule() {
  const router = useRouter()
  const courseId = router.query.courseId as string
  const moduleId = router.query.moduleId as string

  const courseQuery = trpc.useQuery(['courses.get', { id: courseId }])
  const courseUpdate = trpc.useMutation('courses.update')

  const [module, setModule] = useState<Module | null>(null)

  const course = courseQuery.data

  useEffect(() => {
    if (course) {
      setModule(course.modules.find(({ id }) => id === moduleId) || null)
    }
  }, [course, moduleId])

  function handleDeleteModule() {
    if (!course || !module) return

    courseUpdate.mutate(
      {
        id: course.id,
        course: {
          ...course,
          modules: course.modules.filter(({ id }) => id !== module.id),
        },
      },
      {
        onSuccess: () => {
          router.push(`/cursos/${course.id}`)
        },
      },
    )
  }

  function handleUpdateModule() {
    if (!course || !module) return
    courseUpdate.mutate(
      {
        id: course.id,
        course: {
          ...course,
          modules: course.modules.map((m) => {
            if (m.id === module.id) {
              return module
            }
            return m
          }),
        },
      },
      {
        onSuccess: () => {
          client.invalidateQueries(['courses.get', { id: course.id }])
        },
      },
    )
  }

  function handleAddLesson(lesson: CodeLesson | QuizLesson) {
    if (!course || !module) return
    setModule({
      ...module,
      lessons: [...module.lessons, lesson],
    })
  }

  function handleCreateCodeLesson() {
    if (!course || !module) return
    handleAddLesson(emptyCodeLesson())
  }

  function handleCreateQuizLesson() {
    if (!course || !module) return
    handleAddLesson(emptyQuizLesson())
  }

  function updateLesson(lesson: CodeLesson | QuizLesson) {
    if (!course || !module) return
    setModule({
      ...module,
      lessons: module.lessons.map((l) => {
        if (l.id === lesson.id) {
          return lesson
        }
        return l
      }),
    })
  }

  if (!course || !module) return null

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between">
        <h1 className="my-auto flex text-5xl font-semibold">Editar Módulo</h1>
        <div>
          <button
            onClick={handleDeleteModule}
            className="mr-4 rounded-lg p-2 text-red-600 hover:bg-red-100"
          >
            <TrashIcon className="h-10 w-10" />
          </button>
          <button
            onClick={handleUpdateModule}
            className="rounded-lg p-2 text-green-600 hover:bg-green-100"
          >
            <DocumentCheckIcon className="h-10 w-10" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Titulo
          </label>
          <input
            value={module.title}
            onChange={(e) => setModule({ ...module, title: e.target.value })}
            type="text"
            id="title"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Titulo"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Descrição
          </label>
          <input
            value={module.description}
            onChange={(e) =>
              setModule({ ...module, description: e.target.value })
            }
            type="text"
            id="description"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Descrição"
            required
          />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4">
        <div className="flex justify-between">
          <h3 className="my-auto flex text-3xl font-semibold">Exercícios</h3>
          <div>
            <button
              className="mr-4 rounded-lg bg-purple-100/70 py-2 px-4 text-purple-600 hover:bg-purple-200/80"
              onClick={handleCreateQuizLesson}
            >
              <QuestionMarkCircleIcon className="h-6 w-6 font-medium" />
            </button>
            <button
              className="rounded-lg bg-sky-100/70 py-2 px-4 text-sky-600 hover:bg-sky-200/80"
              onClick={handleCreateCodeLesson}
            >
              <CodeBracketIcon className="h-6 w-6 font-medium" />
            </button>
          </div>
        </div>
        {module.lessons.map((lesson, index) => (
          <LessonEditor
            setModule={setModule}
            updateLesson={updateLesson}
            key={index}
            lesson={lesson}
            module={module}
          />
        ))}
      </div>
    </div>
  )
}

export default EditModule
