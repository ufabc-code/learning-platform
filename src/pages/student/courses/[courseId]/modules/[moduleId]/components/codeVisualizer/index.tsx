import TestCase from 'components/student/courses/[courseId]/modules/[moduleId]/components/codeVisualizer/TestCase'
import Tabs from 'components/tabs'
import CodeLesson from 'server/entities/codeLesson'

interface CodeVisualizerProps {
  codeLesson: CodeLesson
}

export function CodeVisualizer({ codeLesson }: CodeVisualizerProps) {
  return (
    <div className="m-2 py-2">
      <div>
        <Tabs
          active={0}
          tabs={[
            {
              name: 'Exercício',
              children: (
                <div className="grid grid-cols-2 gap-4">
                  <div>{codeLesson.text}</div>
                  <div>
                    <textarea
                      rows={15}
                      cols={100}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Your code..."
                      value={codeLesson.template.code}
                    ></textarea>
                  </div>
                </div>
              ),
            },
            {
              name: 'Testes',
              children: (
                <div className="grid grid-cols-1 gap-4 pb-4">
                  {codeLesson.tests.map((test, index) => (
                    <TestCase
                      key={index}
                      label={`Teste #${index + 1}`}
                      test={test}
                    />
                  ))}
                </div>
              ),
            },
            {
              name: 'Solução',
              children: (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">Solução</h1>
                    {codeLesson.solution.text}
                  </div>
                  <div>
                    <textarea
                      rows={15}
                      cols={100}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      disabled={true}
                      value={codeLesson.solution.code}
                    ></textarea>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div className="mt-8">
        <button
          type="button"
          onClick={() => {
            alert(
              JSON.stringify(codeLesson.solution.text) +
                '\n' +
                JSON.stringify(codeLesson.solution.code),
            )
          }}
          className="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Verificar
        </button>
      </div>
      {/* <pre>
        <code>{JSON.stringify(codeLesson, null, 2)}</code>
      </pre>
      <div>
        <div>
          
          <br />
        </div>
        
      </div> */}
    </div>
  )
}
