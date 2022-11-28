import Container from 'components/container'
import { Navbar, Button } from 'flowbite-react'
import { useUser } from 'providers/user'
import Link from 'next/link'
import { useRouter } from 'next/router'

const routes = [
  {
    name: 'Cursos',
    path: '/student',
  },
]

const Header = () => {
  const { pathname } = useRouter()

  const { user, logout } = useUser()

  return (
    <header className="mb-4 border-b border-gray-300">
      <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
        <Container>
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-800 underline">
              <Link href="/">Learning Platform</Link>
            </h1>
            <ul className="flex flex-grow list-none justify-evenly">
              {routes.map((route) => (
                <Navbar.Link
                  href={route.path}
                  key={route.path}
                  active={pathname.startsWith(route.path)}
                >
                  {route.name}
                </Navbar.Link>
              ))}
            </ul>
            <div className="flex gap-3 md:order-2">
              {!user?.email && (
                <Link href="/login" passHref>
                  <a>
                    <Button>Login</Button>
                  </a>
                </Link>
              )}
              {!!user?.email && (
                <Button onClick={() => logout()}>Logout</Button>
              )}
            </div>
          </div>
        </Container>
      </nav>
    </header>
  )
}

export default Header
