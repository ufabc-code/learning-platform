import Container from 'components/container'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

type AdminPageBaseProps = { title: string }

const AdminPageBase: React.FC<PropsWithChildren<AdminPageBaseProps>> = ({
  children,
  title,
}): JSX.Element => {
  const routes = [
    {
      title: 'Gerenciar Cursos',
      href: '/admin/courses',
    },
  ]

  return (
    <Container>
      <div className="flex gap-x-10">
        <div className="w-1/5">
          <h1 className="text-4xl font-bold">Admin</h1>
          <div className="mt-10">
            {routes.map(({ title, href }, index) => (
              <Link key={index} href={href}>
                <a
                  className={`block h-full w-full border border-black px-3 py-4 text-center text-xl font-bold hover:bg-black hover:text-white ${
                    index === 0 ? 'rounded-t-md' : ''
                  } ${index === routes.length - 1 ? 'rounded-b-md' : ''}`}
                >
                  {title}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-4/5">
          <h2 className="mt-10 text-3xl font-bold leading-none">{title}</h2>
          {children}
        </div>
      </div>
    </Container>
  )
}

export default AdminPageBase
