import QuizLesson from 'server/entities/quizLesson'

interface SolutionSectionProps {
  quizLesson: QuizLesson
  setQuizLesson: (quizLesson: QuizLesson) => void
}

function SolutionSection({ quizLesson, setQuizLesson }: SolutionSectionProps) {
  return (
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
  )
}

export default SolutionSection
