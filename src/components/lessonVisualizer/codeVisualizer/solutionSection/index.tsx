import CodeEditor from 'components/codeEditor'
import MarkdownRender from 'components/markdownRender'
import { useRef } from 'react'
import CodeLesson from 'server/entities/codeLesson'
import Lottie from 'lottie-react'
import animationData from 'components/animations/lock_animation.json'

interface SolutionSectionProps {
  codeLesson: CodeLesson
  isLocked: boolean
  setIsLocked: (isLocked: boolean) => void
}

interface LottieProps {
  goToAndPlay: (value: number, isFrame?: boolean) => void
  pause: () => void
}

function SolutionSection({
  codeLesson,
  isLocked,
  setIsLocked,
}: SolutionSectionProps) {
  const lottieRef = useRef(null)

  function runUnlockAnimation() {
    const lottie = lottieRef.current as unknown as LottieProps
    if (lottie) {
      lottie.goToAndPlay(1500)
      setTimeout(() => {
        lottie.pause()
      }, 800)
      setTimeout(() => {
        setIsLocked(false)
      }, 1400)
    }
  }

  function handleUnlockSolution() {
    runUnlockAnimation()
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-4">
        <MarkdownRender content={codeLesson.solution.text} />
        <div>
          <CodeEditor
            code={codeLesson.solution.code}
            language={codeLesson.solution.language}
            className="h-96"
          />
        </div>
      </div>
      {isLocked && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10 flex w-full items-center justify-center backdrop-blur-sm">
          <div>
            <div>
              <Lottie
                animationData={animationData}
                loop={false}
                lottieRef={lottieRef}
                autoplay={false}
              />
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
                onClick={handleUnlockSolution}
              >
                Desbloquear solução
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SolutionSection
