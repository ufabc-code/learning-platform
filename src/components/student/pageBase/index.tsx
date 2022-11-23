import Container from 'components/container'
import { PropsWithChildren } from 'react'

type StudentPageBaseProps = { title: string }

const StudentPageBase: React.FC<PropsWithChildren<StudentPageBaseProps>> = ({
  children,
  title,
}): JSX.Element => {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold">Área do aluno</h1>
        <div className="mt-10 flex gap-x-10">
          <section className="w-4/5">
            <h2 className="mb-10 text-2xl font-bold leading-none">{title}</h2>
            {children}
          </section>
        </div>
      </div>
    </Container>
  )
}

export default StudentPageBase
