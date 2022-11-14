import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownRenderProps {
  content: string
}

export default function MarkdownRender({ content }: MarkdownRenderProps) {
  return (
    <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  )
}
