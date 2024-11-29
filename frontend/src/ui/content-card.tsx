import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { renderIcon } from "@/lib/render-icon";
import { Share2, Trash2 } from "lucide-react";
import { Content } from "@/types/ContentTypes";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import '@mariusbongarts/previewbox/dist/link/index';

export function ContentCard({ content }: { content: Content }) {
    const queryClient = new QueryClient();
    const deleteContent = useMutation({
        mutationKey: ['delete-content'],
        mutationFn: async (id: string) => {
            const res = await axios.delete(`http://localhost:3000/api/content/${id}`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            return res.data;
        },
        onSuccess: (response) => {
            toast({
                title: response?.message || 'Content deleted successfully',
            })
            queryClient.invalidateQueries({ queryKey: ['contents'] })
        }
    })
    return (
        <Card key={content._id} className="w-full m-4">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle className="flex gap-2 items-center" >
                    {renderIcon(content?.type?.name.toLowerCase())}
                    {content?.title.substring(0, 25)}
                </CardTitle>
                <div className="flex gap-2 items-center text-muted-foreground">
                    <Button variant={'ghost'}>
                        <Share2 size={"lg"} />
                    </Button>
                    <Button variant={'ghost'} onClick={() => deleteContent.mutate(content._id)}>
                        <Trash2 size={'lg'} />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {content?.type?.name !== ("article") ?
                    //@ts-ignore
                    <previewbox-link href={content?.content}></previewbox-link>
                    :
                    <p>{content?.content}</p>
                }
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
                <CardDescription className="flex gap-2">{content?.tags?.map(tag =>
                    <Badge key={tag._id} variant={'secondary'} className="rounded-full">#{tag.name}</Badge>
                )}
                </CardDescription>
                <span className="text-sm text-accent-foreground font-medium">
                    Added on {new Date(content?.createdAt).toLocaleDateString()}
                </span>
            </CardFooter>
        </Card>
    )
}