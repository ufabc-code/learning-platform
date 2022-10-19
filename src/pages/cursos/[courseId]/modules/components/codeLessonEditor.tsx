import CodeLesson from "server/entities/codeLesson"

interface CodeLessonEditorProps {
	codeLesson: CodeLesson
	setCodeLesson?: (codeLesson: CodeLesson) => void
}


export function CodeLessonEditor({codeLesson}: CodeLessonEditorProps) {

	return (
		<div>
			<pre>{JSON.stringify(codeLesson, null, 2)}</pre>
			<div>
				<h1>Solution</h1>
				<div>
					<div>
						<label
							htmlFor="title"
							className="mb-2 block text-sm font-medium text-gray-900"
						>
							Código
						</label>
						<input
							value={codeLesson.solution.code}
							onChange={(e) => {}}
							type="text"
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
							onChange={(e) => {}}
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
							onChange={(e) => {}}
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
						<input
							value={codeLesson.template.code}
							onChange={(e) => {}}
							type="text"
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
							onChange={(e) => {}}
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
					<div>
						<label
							htmlFor="title"
							className="mb-2 block text-sm font-medium text-gray-900"
						>
							Teste N
						</label>
						<input
							value={codeLesson.template.code}
							onChange={(e) => {}}
							type="text"
							id="title"
							className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
							placeholder="1 2 3 4"
							required
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
