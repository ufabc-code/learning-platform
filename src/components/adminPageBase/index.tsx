import Link from 'next/link'
import { PropsWithChildren } from 'react'

type AdminPageBaseProps = { title: string }

const AdminPageBase: React.FC<PropsWithChildren<AdminPageBaseProps>> = ({
  children,
  title
}): JSX.Element => {
  return (
    <div className="container mx-auto">
      <div className="py-12">
        <h1 className="text-4xl font-bold">Admin</h1>
        <div className="mt-10 flex gap-x-10">
          <nav className="w-1/5">
            <ul>
              <li className="border border-solid border-black px-3 py-4">
                <Link href="/admin/courses">Gerenciar Cursos</Link>
              </li>
            </ul>
          </nav>
          <section className="w-4/5">
            <h2 className="mb-10 text-3xl font-bold leading-none">{title}</h2>
            {children}
          </section>
        </div>
      </div>
    </div>
  )
}

export default AdminPageBase
