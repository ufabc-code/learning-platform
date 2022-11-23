import Spinner from 'components/spinner'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

type FinishModuleCongratulationProps = {
  loading: boolean
  courseId: string
}

const FinishModuleCongratulation = ({
  loading,
  courseId,
  children,
}: PropsWithChildren<FinishModuleCongratulationProps>) => {
  return (
    <div className="flex h-screen w-screen items-center text-center">
      <div className="w-1/2">
        <h2 className="mb-12 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Parabéns você completou este módulo
        </h2>
        {loading && (
          <p className="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
            Estamos salvando as suas respostas
          </p>
        )}
        <div className="flex items-center justify-center gap-6">
          <Link href={`/student/courses/${courseId}`}>
            <a
              className={`inline-flex items-center justify-center rounded-lg bg-blue-700 py-3 px-5 text-center text-base font-medium text-white ${
                loading
                  ? 'pointer-events-none cursor-not-allowed bg-blue-200'
                  : 'hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'
              }`}
            >
              Voltar para a listagem
              <div className="ml-6">
                {!loading && (
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
                {loading && <Spinner />}
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  )
}

export default FinishModuleCongratulation
