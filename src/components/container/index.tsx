import { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
  return <div className="container mx-auto px-2">{children}</div>
}

export default Container
