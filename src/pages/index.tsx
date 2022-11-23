import type { NextPage } from 'next'

const AppContent = () => {
  return (
    <div>
      <h1>App Content</h1>
    </div>
  )
}

const Home: NextPage = () => {
  return <AppContent />
}

export default Home
