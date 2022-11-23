import MarkdownRender from 'components/markdownRender'
import StudentQuizAnswer from 'components/student/quizAnswerModal'
import { useState } from 'react'
import QuizLesson from 'server/entities/quizLesson'

interface QuizVisualizerProps {
  quizLesson: QuizLesson
  handleEvaluateAnswer: (answer: { alternatives: number[] }) => void
}

export function QuizVisualizer({
  quizLesson,
  handleEvaluateAnswer,
}: QuizVisualizerProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedAlternatives, setSelectedAlternatives] = useState<number[]>([])

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

      <button
        type="button"
        onClick={() =>
          handleEvaluateAnswer({ alternatives: selectedAlternatives })
        }
        className="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        Verificar
      </button>

      <button
        onClick={() => setIsModalVisible(true)}
        className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        type="button"
        data-modal-toggle="popup-modal"
      >
        Visualizar Resposta
      </button>
      {isModalVisible && (
        <StudentQuizAnswer
          onClose={() => setIsModalVisible(false)}
          content={quizLesson.solution.text}
        />
      )}
    </div>
  )
}
