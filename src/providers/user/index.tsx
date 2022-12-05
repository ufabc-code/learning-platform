import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type User = {
  email: string
  exp: number
  iat: number
  id: string
}

type UserContextProps = {
  login: (token: string) => void
  logout: () => void
  user: User | null
}

const UserContext = createContext<UserContextProps>({
  login(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    token: string,
  ) {
    // default value.
  },
  logout() {
    // default value.
  },
  user: null,
})

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const login = (token: string) => {
    const tokenPayloadString = token.split('.')?.[1]
    if (tokenPayloadString) {
      localStorage.setItem('token', token)
      setUser(JSON.parse(atob(tokenPayloadString)))
    }
  }

  useEffect(() => {
    const tokenPayloadString = localStorage.getItem('token')?.split('.')?.[1]
    if (tokenPayloadString) {
      setUser(JSON.parse(atob(tokenPayloadString)))
    }
  }, [])

  const props = useMemo(
    () => ({
      login,
      logout,
      user,
    }),
    [user],
  )

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>
}

export default UserProvider

export function useUser(): UserContextProps {
  return useContext(UserContext)
}
