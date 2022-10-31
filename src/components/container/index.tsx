import { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="container mx-auto" data-testid="container">
      {children}
    </div>
  )
}

export default Container
