import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { cpp } from '@codemirror/lang-cpp'
import { python } from '@codemirror/lang-python'

interface CodeEditorProps {
  code: string
  language: string
  onchange?: (code: string) => void
  className?: string
}

type CodeMirrorExtensions = Exclude<
  Parameters<typeof CodeMirror>[0]['extensions'],
  undefined
>

export default function CodeEditor({
  code,
  language,
  onchange,
  className,
}: CodeEditorProps) {
  const extensions: Record<string, CodeMirrorExtensions[0]> = {
    javascript: javascript(),
    'c++': cpp(),
    python: python(),
  }

  const languageExtension = extensions[language]

  return (
    <CodeMirror
      value={code}
      height="100%"
      className={`h-32 ${className}`}
      extensions={languageExtension ? [languageExtension] : []}
      onChange={(value) => {
        onchange && onchange(value)
      }}
    />
  )
}
