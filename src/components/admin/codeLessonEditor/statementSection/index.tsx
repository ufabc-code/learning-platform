import CodeLesson from 'server/entities/codeLesson'

interface StatementSectionProps {
  codeLesson: CodeLesson
  setCodeLesson: (codeLesson: CodeLesson) => void
}

function StatementSection({
  codeLesson,
  setCodeLesson,
}: StatementSectionProps) {
  return (
    <div className="rounded-lg border p-4">
      <label
        htmlFor="text"
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        Enunciado
      </label>
      <textarea
        value={codeLesson.text}
        onChange={(e) => setCodeLesson({ ...codeLesson, text: e.target.value })}
        id="text"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder="Enunciado"
        required
        rows={6}
      />
    </div>
  )
}

export default StatementSection
