import { CardContent } from '@/components/ui/card';
import { useGetSharedContent } from '@/queries/share.query';
import { ContentCard } from '@/ui/content-card';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/share/$tokenId')({
    component: () => <SharedCard />,
})
function SharedCard() {
    const getLinkk = useGetSharedContent();
    const tokenId = Route.useParams().tokenId;
    const [content, setContent] = useState();
    useEffect(() => {
        getLinkk.mutate(tokenId, {
            onSuccess: (response) => {
                setContent(response?.content);
            }
        });
    }, [tokenId])
    console.log("content", content)
    // const data = content;
    return (
        <>
            {
                content &&
                content.map(con => {
                    return (
                        <div className='p-4'>
                            <h2 className='mb-4 font-bold text-2xl'> Kshetritej shared his brainmark</h2>
                            <ContentCard content={con} />
                        </div>)
                })}
        </>
    )
}
