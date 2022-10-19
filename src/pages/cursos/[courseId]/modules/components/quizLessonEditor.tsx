import QuizLesson from "server/entities/quizLesson"


interface QuizLessonEditorProps {
    quizLesson: QuizLesson
    setQuizLesson?: (quizLesson: QuizLesson) => void
}


export function QuizLessonEditor({ quizLesson }: QuizLessonEditorProps) {
    return (
        <div>
            <pre>{JSON.stringify(quizLesson, null, 2)}</pre>
        </div>
    )
}