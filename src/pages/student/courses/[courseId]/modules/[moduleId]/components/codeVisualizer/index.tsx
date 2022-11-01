import CodeLesson from 'server/entities/codeLesson'

interface CodeVisualizerProps {
  codeLesson: CodeLesson
}

export function CodeVisualizer({ codeLesson }: CodeVisualizerProps) {
  return (
    <div className="border-2 border-red-500">
      <h1>Code Visualizer</h1>
      <div>
        <pre>{JSON.stringify(codeLesson, null, 2)}</pre>
      </div>
    </div>
  )
}
