interface ProgressBarProps {
  progress: number
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-4 w-full rounded-full bg-gray-200">
      <div
        className="h-4 rounded-full bg-blue-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ProgressBar
