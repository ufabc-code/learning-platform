import CodeLesson from 'server/entities/codeLesson'

interface CodeLessonEditorProps {
  codeLesson: CodeLesson
  setCodeLesson: (codeLesson: CodeLesson) => void //QUESTION: pq tava com '?'
}

export function CodeLessonEditor({
  codeLesson,
  setCodeLesson
}: CodeLessonEditorProps) {
  return (
    <div>
      <div>
        <h1>Solução</h1>
        <div>
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Código
            </label>
            <textarea
              value={codeLesson.solution.code}
              rows={20}
              onChange={(e) =>
                setCodeLesson({
                  ...codeLesson,
                  solution: { ...codeLesson.solution, code: e.target.value }
                })
              }
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="print('Hello world!')"
              required
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
            <input
              value={codeLesson.solution.text}
              onChange={(e) => {
                const updatedLesson = { ...codeLesson }
                updatedLesson.solution.text = e.target.value
                setCodeLesson(updatedLesson)
              }}
              type="text"
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="O motivo do algoritmo funcionar..."
              required
            />
          </div>
        </div>
      </div>
      <div>
        <h1>Template</h1>
        <div>
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Código
            </label>
            <textarea
              rows={10}
              value={codeLesson.template.code}
              onChange={(e) => {
                const updatedLesson = { ...codeLesson }
                updatedLesson.template.code = e.target.value
                setCodeLesson(updatedLesson)
              }}
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="print('Hello world!')"
              required
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
      <div>
        <h1>Testes</h1>
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
                <input
                  value={test.input}
                  onChange={(e) => {
                    test.input = e.target.value
                    const updatedLesson = { ...codeLesson }
                    updatedLesson.tests[index] = test
                    setCodeLesson(updatedLesson)
                  }}
                  type="text"
                  id={'test-in-' + index}
                  className="inline w-max rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="1 2 3 4"
                  required
                />
                <input
                  value={test.expected}
                  onChange={(e) => {
                    test.expected = e.target.value
                    const updatedLesson = { ...codeLesson }
                    updatedLesson.tests[index] = test
                    setCodeLesson(updatedLesson)
                  }}
                  type="text"
                  id={'test-out-' + index}
                  className="ml-2 inline w-max rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="1 2 3 4"
                  required
                />
              </div>
            </div>
          ))}
        </div>
        <button
          className="m-4 bg-red-500 p-4"
          onClick={() => {
            const updatedLesson = { ...codeLesson }
            updatedLesson.tests.push({ input: '', expected: '' })
            setCodeLesson(updatedLesson)
          }}
        >
          ADD TEST
        </button>
      </div>

      <pre>{JSON.stringify(codeLesson, null, 2)}</pre>
    </div>
  )
}
