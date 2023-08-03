import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { cpp } from '@codemirror/lang-cpp'
import { python } from '@codemirror/lang-python'
import { vim } from '@replit/codemirror-vim'
import { emacs } from '@replit/codemirror-emacs'

interface CodeEditorProps {
  code: string
  language: string
  onchange?: (code: string) => void
  className?: string
  keyBinding?: string
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
  keyBinding,
}: CodeEditorProps) {
  console.log('render code editor')
  const languageExtensions: Record<string, CodeMirrorExtensions[0]> = {
    javascript: javascript(),
    'c++': cpp(),
    python: python(),
  }
  const keyBindingExtensions: Record<string, CodeMirrorExtensions[0]> = {
    vim: vim(),
    emacs: emacs(),
  }

  const languageExtension = languageExtensions[language]
  const keyBindingExtension = keyBindingExtensions[keyBinding ?? '']

  function extensions(): any[] {
    const extensions: any[] = []
    if (keyBindingExtension) extensions.push([keyBindingExtension])
    if (languageExtension) extensions.push([languageExtension])
    return extensions
  }

  return (
    <CodeMirror
      value={code}
      height="100%"
      className={`h-32 ${className}`}
      extensions={extensions()}
      onChange={(value) => {
        onchange && onchange(value)
      }}
    />
  )
}
