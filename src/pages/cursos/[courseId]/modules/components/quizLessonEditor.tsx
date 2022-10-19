import QuizLesson from "server/entities/quizLesson"


interface QuizLessonEditorProps {
    quizLesson: QuizLesson
    setQuizLesson: (quizLesson: QuizLesson) => void
}


export function QuizLessonEditor({ quizLesson, setQuizLesson }: QuizLessonEditorProps) {

    function handleAddAlternative() {
        quizLesson.alternatives.push({ text: "nova alternativa" })
        setQuizLesson({ ...quizLesson })
    }

    function handleRemoveAlternative(index: number) {
        quizLesson.alternatives = quizLesson.alternatives.filter((_, i) => i !== index)
        setQuizLesson({ ...quizLesson })
    }


    return (


        <div className="grid grid-cols-1 gap-4 border-2 border-red-500">
            <div>
                <label
                    htmlFor="text"
                    className="mb-2 block text-sm font-medium text-gray-900"
                >
                    Enunciado
                </label>
                <textarea
                    value={quizLesson.text}
                    onChange={(e) => setQuizLesson({ ...quizLesson, text: e.target.value })}
                    id="text"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enunciado"
                    required
                />
            </div>

            <div>
                <label
                    htmlFor="solution-text"
                    className="mb-2 block text-sm font-medium text-gray-900"
                >
                    Solução
                </label>
                <textarea
                    value={quizLesson.solution.text}
                    onChange={(e) => {
                        quizLesson.solution.text = e.target.value
                        setQuizLesson({ ...quizLesson })
                    }}
                    id="solution-text"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Solução"
                    required
                />
            </div>

            <div>
                <button className="bg-red-500 p-4"
                    onClick={handleAddAlternative}>
                    Add
                </button>
            </div>

            <div>

                {
                    quizLesson.alternatives.map((alternative, index) => (
                        <div key={index} className="flex items-center mb-4 border-2 border-blue-500">
                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <input value={alternative.text}
                                onChange={(e) => {
                                    quizLesson.alternatives[index]!.text = e.target.value
                                    setQuizLesson({ ...quizLesson })
                                }}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" />

                            <button className="bg-red-500 p-4"
                                onClick={() => handleRemoveAlternative(index)}>
                                Remover
                            </button>
                        </div>
                    ))
                }


            </div>


            <pre>{JSON.stringify(quizLesson, null, 2)}</pre>
        </div>
    )
}