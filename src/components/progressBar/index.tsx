interface ProgressBarProps {
  progress: number
  color?: string
}

function ProgressBar({ progress, color = 'blue-500' }: ProgressBarProps) {
  return (
    <div className="h-4 w-full rounded-full bg-gray-200">
      <div
        className={`h-4 rounded-full bg-${color}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ProgressBar
