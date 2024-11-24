import { useEffect, useState } from 'react'
import { Navbar } from '@/ui/navbar'
import { Content, ContentCard } from '@/ui/content-card'
import axios from 'axios'
function App() {
  const [contents, setContents] = useState<Content[]>([])
  const fetchData = async() => await axios.get('http://localhost:3000/content/all')
  useEffect(() => {
    fetchData().then(res => {
      setContents(res.data.content)
    })
  },[]),

  console.log('contents: ', contents)
  return (
    <div className='bg-background h-screen'>
      <Navbar />
      <ContentCard content={contents} />
    </div>
  )
}

export default App
