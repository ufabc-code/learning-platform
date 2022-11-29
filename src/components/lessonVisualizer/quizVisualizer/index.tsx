import MarkdownRender from 'components/markdownRender'
import { useState } from 'react'
import QuizLesson from 'server/entities/quizLesson'
import StudentQuizAnswer from './quizAnswerModal'

interface QuizVisualizerProps {
  quizLesson: QuizLesson
  handleEvaluateAnswer: (answer: { alternatives: number[] }) => Promise<boolean>
  markQuestionAsSolved?: () => void
  markQuestionAsUnsolved?: () => void
  debug?: boolean
}

export function QuizVisualizer({
  quizLesson,
  handleEvaluateAnswer,
  markQuestionAsSolved,
  markQuestionAsUnsolved,
  debug,
}: QuizVisualizerProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedAlternatives, setSelectedAlternatives] = useState<number[]>([])
  const [correctAnswer, setCorrectAnswer] = useState<undefined | boolean>(
    undefined,
  )

  function toggleAlternative(alternativeId: number) {
    if (selectedAlternatives.includes(alternativeId)) {
      setSelectedAlternatives(
        selectedAlternatives.filter(
          (alternative) => alternative !== alternativeId,
        ),
      )
    } else {
      setSelectedAlternatives([...selectedAlternatives, alternativeId])
    }
  }

  async function handleEvaluateQuizAnswer() {
    setCorrectAnswer(
      await handleEvaluateAnswer({
        alternatives: selectedAlternatives,
      }),
    )
    setIsModalVisible(true)
  }

  function handleNextQuestion() {
    if (correctAnswer) {
      markQuestionAsSolved && markQuestionAsSolved()
    } else {
      markQuestionAsUnsolved && markQuestionAsUnsolved()
    }
  }

  function reset() {
    setSelectedAlternatives([])
    setCorrectAnswer(undefined)
    setIsModalVisible(false)
  }

  return (
    <div className="m-2 py-2">
      <MarkdownRender content={quizLesson.text} />
      <div className="mt-4">
        <div className="grid-col-1 grid gap-4">
          {quizLesson.alternatives.map((alternative, index) => (
            <div key={index}>
              <button
                type="button"
                onClick={() => toggleAlternative(index)}
                className={`w-full cursor-pointer rounded-lg border p-4 text-left font-medium hover:bg-gray-200 ${
                  selectedAlternatives.includes(index)
                    ? 'bg-gray-300/70'
                    : 'bg-gray-100/50'
                }`}
              >
                <MarkdownRender content={alternative.text} />
              </button>
            </div>
          ))}
        </div>
        <br />
      </div>

      {isModalVisible && (
        <StudentQuizAnswer
          onClose={() => setIsModalVisible(false)}
          content={quizLesson.solution.text}
        />
      )}
      <div className="mt-8 flex gap-x-4">
        {correctAnswer === undefined ? (
          <button
            type="button"
            onClick={() => handleEvaluateQuizAnswer()}
            className="block rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Verificar
          </button>
        ) : (
          <button
            className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={handleNextQuestion}
            type="button"
          >
            Avançar
          </button>
        )}

        {debug && (
          <button
            type="button"
            onClick={() => reset()}
            className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Reset
          </button>
        )}

        {debug && correctAnswer !== undefined && (
          <span
            className={`block rounded-lg px-5 py-2.5 text-center text-sm font-medium ${
              correctAnswer ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {correctAnswer ? 'Resposta correta' : 'Resposta incorreta'}
          </span>
        )}
      </div>
    </div>
  )
}
