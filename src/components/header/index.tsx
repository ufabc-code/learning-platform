import Container from 'components/container'
import { Navbar, Button } from 'flowbite-react'
import { useUser } from 'providers/user'
import Link from 'next/link'
import { useRouter } from 'next/router'

const style = {
  header: ['bg-gray-900', 'py-2.5'].join(' '),
  nav: ['mx-auto', 'mx-20', 'flex', 'items-center', 'justify-between'].join(
    ' ',
  ),
  buttonWrapper: [].join(' '),
  button: [].join(' '),
  logo: ['h-10', 'w-auto'].join(' '),
  linksList: ['flex', 'list-none', 'justify-evenly', 'gap-10'].join(' '),
  link: ['text-white'].join(' '),
}

const routes = [
  {
    name: 'Cursos',
    path: '/student',
  },
  {
    name: 'Ambiente de programação',
    path: '/programming',
  },
]

const Header = () => {
  const { pathname } = useRouter()

  const { user, logout } = useUser()

  return (
    <header className={style.header}>
      <Container>
        <nav className={style.nav}>
          <Link href="/">
            <a>
              <img className={style.logo} src={'/grub_logo.png'} />
            </a>
          </Link>
          <ul className={style.linksList}>
            {routes.map((route) => (
              <Navbar.Link
                href={route.path}
                key={route.path}
                active={pathname.startsWith(route.path)}
              >
                <span className={style.link}>{route.name}</span>
              </Navbar.Link>
            ))}
          </ul>
          <div className={style.buttonWrapper}>
            {!user?.email && (
              <Link href="/login" passHref>
                <a>
                  <Button className={style.button}>Login</Button>
                </a>
              </Link>
            )}
            {!!user?.email && (
              <Button className={style.button} onClick={() => logout()}>
                Logout
              </Button>
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header
