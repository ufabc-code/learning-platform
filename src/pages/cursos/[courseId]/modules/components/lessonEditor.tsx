import CodeLesson from 'server/entities/codeLesson'
import QuizLesson from 'server/entities/quizLesson'
import { CodeLessonEditor } from './codeLessonEditor'
import { QuizLessonEditor } from './quizLessonEditor'

interface LessonEditorProps {
  lesson: CodeLesson | QuizLesson
  updateLesson: (lesson: CodeLesson | QuizLesson) => void
}

export function LessonEditor({ lesson, updateLesson }: LessonEditorProps) {
  if (lesson.type === 'code') {
    return (
      <CodeLessonEditor
        setCodeLesson={updateLesson}
        codeLesson={lesson as CodeLesson}
      />
    )
  }
  return (
    <QuizLessonEditor
      setQuizLesson={updateLesson}
      quizLesson={lesson as QuizLesson}
    />
  )
}
