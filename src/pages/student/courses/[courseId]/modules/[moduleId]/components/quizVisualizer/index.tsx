import QuizLesson from 'server/entities/quizLesson'

interface QuizVisualizerProps {
  quizLesson: QuizLesson
}

export function QuizVisualizer({ quizLesson }: QuizVisualizerProps) {
  return (
    <div className="border-2 border-red-500">
      <h1>Quiz Visualizer</h1>
      <div>
        <pre>{JSON.stringify(quizLesson, null, 2)}</pre>
      </div>
    </div>
  )
}
