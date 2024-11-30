import { ContentCard } from '@/ui/content-card'
import { Content } from './types/ContentTypes'
import { Button } from './components/ui/button'
import { Share2 } from 'lucide-react'
import { AppDrawer } from './ui/add-drawer'
import { useGetAllContents } from './queries/content.query'
import { useGetAllTags } from './queries/tags.query'
import { ScrollArea } from './components/ui/scroll-area'
import { useState } from 'react'
function App() {
  const tags = useGetAllTags().data?.tags;
  const content = useGetAllContents().data?.content;
  const [selectedTag, setSelectedTag] = useState(null);
  const filteredData = selectedTag ? content?.filter(con => con.tags.some(tag => tag.name === selectedTag)) : content;
  console.log("Selected tag", selectedTag)
  console.log("filtered data", filteredData)
  console.log("content: ", content)
  return (
    <div className='mx-4'>
      <div className='flex justify-between'>
        <h1 className="m-4 font-bold text-3xl">All Notes</h1>
        <div className='flex gap-4'>
          <Button size={'lg'} variant={'secondary'}><Share2 /> Share Brain</Button>
          <AppDrawer />
        </div>
      </div>
      <ScrollArea className='max-h-[100px]'>
        <Button variant={'secondary'} className="m-2"
          onClick={() => setSelectedTag(null)}
        >All</Button>
        {
          tags?.map((tag: any) => {
            return (
              <Button key={tag._id} variant={'secondary'} className="m-2"
                onClick={() => setSelectedTag(tag?.name)}
              >{tag.name}</Button>
            )
          })
        }
      </ScrollArea>
      <div className='grid sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          filteredData && filteredData.length > 0 ? filteredData.map((content: Content) => {
            return (
              <ContentCard content={content} />
            )
          }) : <div> No items tag: "{selectedTag}".</div>
        }
      </div>
      <div>
        {filteredData == null &&
          content?.map(cont => <ContentCard content={cont} />)
        }
      </div>
    </div>
  )
}
export default App
