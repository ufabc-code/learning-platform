import QuizLesson from 'server/entities/quizLesson'

interface QuizLessonEditorProps {
  quizLesson: QuizLesson
  setQuizLesson: (quizLesson: QuizLesson) => void
}

export function QuizLessonEditor({
  quizLesson,
  setQuizLesson
}: QuizLessonEditorProps) {
  function handleAddAlternative() {
    quizLesson.alternatives.push({ text: 'nova alternativa' })
    setQuizLesson({ ...quizLesson })
  }

  function handleRemoveAlternative(index: number) {
    quizLesson.alternatives = quizLesson.alternatives.filter(
      (_, i) => i !== index
    )
    quizLesson.solution.correct = []
    setQuizLesson({ ...quizLesson })
  }

  function handleAddCorrectAlternative(index: number) {
    if (!quizLesson.solution.correct.includes(index)) {
      quizLesson.solution.correct.push(index)
      setQuizLesson({ ...quizLesson })
    }
  }

  function handleRemoveCorrectAlternative(index: number) {
    quizLesson.solution.correct = quizLesson.solution.correct.filter(
      (i) => i !== index
    )
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
          onChange={(e) =>
            setQuizLesson({ ...quizLesson, text: e.target.value })
          }
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
        <button className="bg-red-500 p-4" onClick={handleAddAlternative}>
          Add
        </button>
      </div>

      <div>
        {quizLesson.alternatives.map((alternative, index) => (
          <div
            key={index}
            className="mb-4 flex items-center border-2 border-blue-500"
          >
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              checked={quizLesson.solution.correct.includes(index)}
              onChange={(e) => {
                if (e.target.checked) {
                  handleAddCorrectAlternative(index)
                } else {
                  handleRemoveCorrectAlternative(index)
                }
              }}
            />
            <input
              value={alternative.text}
              onChange={(e) => {
                alternative.text = e.target.value
                setQuizLesson({ ...quizLesson })
              }}
              className="ml-5 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />

            <button
              className="bg-red-500 p-4"
              onClick={() => handleRemoveAlternative(index)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <pre>{JSON.stringify(quizLesson, null, 2)}</pre>
    </div>
  )
}
