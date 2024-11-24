import { useState } from 'react'
import { Navbar } from '@/ui/navbar'
import { ContentCard } from '@/ui/content-card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-background h-screen'>
      <Navbar />
      <ContentCard />
    </div>
  )
}

export default App
