interface ProgressBarProps {
  progress: number
  className?: string
}

function ProgressBar({ progress, className = 'bg-blue-500' }: ProgressBarProps) {
  return (
    <div className="h-4 w-full rounded-full bg-gray-200">
      <div
        className={`h-4 rounded-full ${className}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ProgressBar
