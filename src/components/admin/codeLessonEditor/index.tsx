import { PlusIcon } from '@heroicons/react/24/solid'
import CodeEditor from 'components/codeEditor'
import CodeLesson from 'server/entities/codeLesson'

interface CodeLessonEditorProps {
  codeLesson: CodeLesson
  setCodeLesson: (codeLesson: CodeLesson) => void
}

export function CodeLessonEditor({
  codeLesson,
  setCodeLesson,
}: CodeLessonEditorProps) {
  function handleAddTest() {
    const updatedLesson = { ...codeLesson }
    updatedLesson.tests.push({ input: '', expected: '' })
    setCodeLesson(updatedLesson)
  }
  return (
    <div>
      <div className="my-2 rounded-lg border p-4">
        <h1 className="my-2">Solução</h1>
        <div>
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Código
            </label>
            <CodeEditor
              code={codeLesson.solution.code}
              language={codeLesson.solution.language}
              onchange={(code) =>
                setCodeLesson({
                  ...codeLesson,
                  solution: { ...codeLesson.solution, code },
                })
              }
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Linguagem
            </label>
            <input
              value={codeLesson.solution.language}
              onChange={(e) => {
                const updatedLesson = { ...codeLesson }
                updatedLesson.solution.language = e.target.value
                setCodeLesson(updatedLesson)
              }}
              type="text"
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="python"
              required
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Explicação
            </label>
            <textarea
              value={codeLesson.solution.text}
              onChange={(e) => {
                const updatedLesson = { ...codeLesson }
                updatedLesson.solution.text = e.target.value
                setCodeLesson(updatedLesson)
              }}
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="O motivo do algoritmo funcionar..."
              required
            />
          </div>
        </div>
      </div>
      <div className="my-2 rounded-lg border p-4">
        <h1 className="my-4">Template</h1>
        <div>
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Código
            </label>
            <CodeEditor
              code={codeLesson.template.code}
              language={codeLesson.template.language}
              onchange={(code) => {
                const updatedLesson = { ...codeLesson }
                updatedLesson.template.code = code
                setCodeLesson(updatedLesson)
              }}
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Linguagem
            </label>
            <input
              value={codeLesson.template.language}
              onChange={(e) => {
                const updatedLesson = { ...codeLesson }
                updatedLesson.template.language = e.target.value
                setCodeLesson(updatedLesson)
              }}
              type="text"
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="python"
              required
            />
          </div>
        </div>
      </div>
      <div className="my-2 rounded-lg border p-4">
        <h1 className="my-4">Testes</h1>
        <div>
          {codeLesson.tests.map((test, index) => (
            <div key={index}>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Teste {index}
              </label>
              <div className="inline">
                <textarea
                  value={test.input}
                  onChange={(e) => {
                    test.input = e.target.value
                    const updatedLesson = { ...codeLesson }
                    updatedLesson.tests[index] = test
                    setCodeLesson(updatedLesson)
                  }}
                  id={'test-in-' + index}
                  className="inline w-max rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="1 2 3 4"
                  required
                />
                <textarea
                  value={test.expected}
                  onChange={(e) => {
                    test.expected = e.target.value
                    const updatedLesson = { ...codeLesson }
                    updatedLesson.tests[index] = test
                    setCodeLesson(updatedLesson)
                  }}
                  id={'test-out-' + index}
                  className="ml-2 inline w-max rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="1 2 3 4"
                  required
                />
              </div>
            </div>
          ))}
        </div>
        <div className="my-4 text-left">
          <button
            className="rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
            onClick={handleAddTest}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
