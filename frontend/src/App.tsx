import { ContentCard } from '@/ui/content-card'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Content } from './types/ContentTypes'
import { Button } from './components/ui/button'
import {  Share2 } from 'lucide-react'
import { AppDrawer } from './ui/add-drawer'
function App() {

  const { data } = useQuery({
    queryKey: ['contents'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/api/content/all', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      return res.data?.content
    }
  })

  return (
    <div >
      <div className='flex justify-between'>
        <h1 className="m-4 font-bold text-3xl">All Notes</h1>
        <div className='flex gap-4'>
          <Button size={'lg'} variant={'secondary'}><Share2 /> Share Brain</Button>
          <AppDrawer />
        </div>
      </div>
      {/* <ScrollArea className='h-screen'> */}
      <div className='grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {data && data.map((content: Content) => {
          return (
            <ContentCard content={content} />
          )
        })}
      </div>
      {/* </ScrollArea> */}
    </div>
  )
}
export default App
