import { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
  return <div className="container mx-auto">{children}</div>
}

export default Container
