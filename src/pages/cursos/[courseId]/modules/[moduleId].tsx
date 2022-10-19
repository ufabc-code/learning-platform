import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CodeLesson from 'server/entities/codeLesson'
import Module from 'server/entities/module'
import QuizLesson from 'server/entities/quizLesson'
import { client, trpc } from 'utils/trpc'
import { LessonEditor } from './components/lessonEditor'

function emptyCodeLesson(): CodeLesson {
  return {
    id: Math.random().toString(),
    type: 'code',
    solution: {
      code: '',
      language: '',
      text: ''
    },
    template: {
      code: '',
      language: ''
    },
    tests: [],
    text: 'string'
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
      correct: []
    }
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
          modules: course.modules.filter(({ id }) => id !== module.id)
        }
      },
      {
        onSuccess: () => {
          router.push(`/cursos/${course.id}`)
        }
      }
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
          })
        }
      },
      {
        onSuccess: () => {
          client.invalidateQueries(['courses.get', { id: course.id }])
        }
      }
    )
  }

  function handleAddLesson(lesson: CodeLesson | QuizLesson) {
    if (!course || !module) return
    setModule({
      ...module,
      lessons: [...module.lessons, lesson]
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
      })
    })
  }

  if (!course || !module) return null

  return (
    <div>
      <div>
        <button onClick={handleDeleteModule} className="m-4 bg-red-500 p-4">
          deletar módulo
        </button>
        <button onClick={handleUpdateModule} className="m-4 bg-red-500 p-4">
          atualizar módulo
        </button>
        <button className="m-4 bg-red-500 p-4" onClick={handleCreateCodeLesson}>
          criar aula de código
        </button>
        <button className="m-4 bg-red-500 p-4" onClick={handleCreateQuizLesson}>
          criar aula de quiz
        </button>
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

      <div className="grid grid-cols-1 gap-4">
        {module.lessons.map((lesson, index) => (
          <LessonEditor
            updateLesson={updateLesson}
            key={index}
            lesson={lesson}
          />
        ))}
      </div>
    </div>
  )
}

export default EditModule
