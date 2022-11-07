import CodeLesson from 'server/entities/codeLesson'

interface CodeVisualizerProps {
  codeLesson: CodeLesson
}

export function CodeVisualizer({ codeLesson }: CodeVisualizerProps) {
  return (
    <div className="m-2 py-2">
      <h1 className="py-2 text-2xl font-bold">Code Visualizer</h1>
      <div>
        {/* <pre>{JSON.stringify(codeLesson, null, 2)}</pre> */}
      </div>
      <div>
        <div className="border-y-2">
          <h1 className="pt-4 pb-1 font-semibold">
            Resolva o seguinte problema de programação com seu próprio código:
          </h1>
        </div>
        <div>
          <h2 className="py-2">{codeLesson.text}</h2>
          <div className="w-max rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
            <textarea
              rows={15}
              cols={100}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your code..."
              value={codeLesson.template.code}
            >
            </textarea>
          </div>
          <br />
        </div>
        <button
          type="button"
          onClick={() => {
            alert(JSON.stringify(codeLesson.solution.text)
            +"\n"
            +JSON.stringify(codeLesson.solution.code))}}
          className="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Verificar
        </button>
      </div>

    </div>
  )
}