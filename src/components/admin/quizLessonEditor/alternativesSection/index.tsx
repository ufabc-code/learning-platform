import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import QuizLesson from 'server/entities/quizLesson'

interface AlternativesSectionProps {
  quizLesson: QuizLesson
  setQuizLesson: (quizLesson: QuizLesson) => void
}

function AlternativesSection({
  quizLesson,
  setQuizLesson,
}: AlternativesSectionProps) {
  function handleAddAlternative() {
    quizLesson.alternatives.push({ text: 'nova alternativa' })
    setQuizLesson({ ...quizLesson })
  }

  function handleRemoveAlternative(index: number) {
    quizLesson.alternatives = quizLesson.alternatives.filter(
      (_, i) => i !== index,
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
      (i) => i !== index,
    )
    setQuizLesson({ ...quizLesson })
  }

  return (
    <>
      <div className="text-right">
        <button
          className="rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
          onClick={handleAddAlternative}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {quizLesson.alternatives.map((alternative, index) => (
          <div key={index} className="flex items-center rounded-md border p-2">
            <input
              type="checkbox"
              className="h-6 w-6 rounded border-gray-300 bg-gray-100 text-blue-600"
              checked={quizLesson.solution.correct.includes(index)}
              onChange={(e) => {
                if (e.target.checked) {
                  handleAddCorrectAlternative(index)
                } else {
                  handleRemoveCorrectAlternative(index)
                }
              }}
            />
            <textarea
              value={alternative.text}
              onChange={(e) => {
                alternative.text = e.target.value
                setQuizLesson({ ...quizLesson })
              }}
              className="ml-5 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />

            <button
              className="p-4"
              onClick={() => handleRemoveAlternative(index)}
            >
              <XMarkIcon className="h-8 w-8 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default AlternativesSection
