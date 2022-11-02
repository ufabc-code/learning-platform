import QuizLesson from 'server/entities/quizLesson'

interface QuizVisualizerProps {
  quizLesson: QuizLesson
}

export function QuizVisualizer({ quizLesson }: QuizVisualizerProps) {
  return (
    <div className="m-2 py-2">
      <h1 className="py-2 text-2xl font-bold">Quiz Visualizer</h1>
      <div>
        <div className="border-y-2">
          <h1 className="pt-4 pb-1 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            laudantium quidem voluptatem quas perferendis eos officia fuga,
            impedit eius tenetur consequatur est fugiat, nam inventore
            temporibus quis, quibusdam excepturi animi?
          </h1>
        </div>
        <div>
          <h2 className="py-2">{quizLesson.text}</h2>
          <div className="w-max rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            {quizLesson.alternatives.map((alternative, index) => (
              <div key={index}>
                <button
                  type="button"
                  className="w-full cursor-pointer border-b border-gray-200 py-2 px-4 text-left font-medium hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
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
          onClick={() => alert(JSON.stringify(quizLesson.solution.text))}
          className="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Verificar
        </button>
        {/* <pre>{JSON.stringify(quizLesson, null, 2)}</pre> */}
      </div>
    </div>
  )
}
