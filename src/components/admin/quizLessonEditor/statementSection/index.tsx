import QuizLesson from 'server/entities/quizLesson'

interface StatementSectionProps {
  quizLesson: QuizLesson
  setQuizLesson: (quizLesson: QuizLesson) => void
}

function StatementSection({
  quizLesson,
  setQuizLesson,
}: StatementSectionProps) {
  return (
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
  )
}

export default StatementSection
