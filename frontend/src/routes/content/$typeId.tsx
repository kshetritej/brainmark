import { useGetContentByType } from '@/queries/content.query';
import { ContentCard } from '@/ui/content-card';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/content/$typeId')({
  component: RenderContentByType,
})

function RenderContentByType() {
  const getContentByType = useGetContentByType();
  const typeId = Route.useParams().typeId;
  const [contents, setContents] = useState();
  useEffect(() => {
    getContentByType.mutate(typeId, {
      onSuccess: (response) => setContents(response.content)
    });
  }, [typeId])
  console.log("contents ", contents)
  return (
    <div className='p-4'>
      {
        contents && contents?.length > 0 &&
        <h1 className='mb-4 font-semibold text-3xl'> All {contents[0].type?.name}s</h1>
      }
      {contents && contents?.length > 0 &&
        contents.map(content =>
          <ContentCard key={content._id} content={content} />
        )
      }
    </div>
  )
}
