import StudentQuizAnswer from 'components/student/quizAnswerModal'
import { useState } from 'react'
import QuizLesson from 'server/entities/quizLesson'

interface QuizVisualizerProps {
  quizLesson: QuizLesson
}

export function QuizVisualizer({ quizLesson }: QuizVisualizerProps) {
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

  function validateAnswer() {
    if (selectedAlternatives.length !== quizLesson.solution.correct.length) {
      console.log('wrong answer')
      alert('wrong answer')
      return
    }

    const correct = quizLesson.solution.correct.map((alternative) =>
      selectedAlternatives.includes(alternative),
    )

    if (!correct) {
      alert('wrong answer')
      console.log('wrong answer')
      return
    }

    alert('correct answer')
    console.log('correct answer')
  }

  return (
    <div className="m-2 py-2">
      <h1 className="py-2 text-2xl font-bold">Quiz Visualizer</h1>
      <div>
        <div className="border-y-2">
          <h1 className="pt-4 pb-1 font-semibold">{quizLesson.text}</h1>
        </div>
        <div>
          <h2 className="py-2">Selecione a(s) alternativas correta(s):</h2>
          <div className="w-max rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900">
            {quizLesson.alternatives.map((alternative, index) => (
              <div key={index}>
                <button
                  type="button"
                  onClick={() => toggleAlternative(index)}
                  className={`w-full cursor-pointer border-b border-gray-200 py-2 px-4 text-left font-medium hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                    selectedAlternatives.includes(index) ? 'bg-gray-200' : ''
                  }`}
                >
                  {alternative.text}
                </button>
              </div>
            ))}
          </div>

          <br />
        </div>

        <button
          type="button"
          onClick={() => validateAnswer()}
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
    </div>
  )
}
