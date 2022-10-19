import CodeLesson from "server/entities/codeLesson"

interface CodeLessonEditorProps {
    codeLesson: CodeLesson
    setCodeLesson?: (codeLesson: CodeLesson) => void
}


export function CodeLessonEditor({ codeLesson }: CodeLessonEditorProps) {
    return (
        <div>
            <pre>{JSON.stringify(codeLesson, null, 2)}</pre>
        </div>
    )
}