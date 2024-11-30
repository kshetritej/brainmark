import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { renderIcon } from "@/lib/render-icon";
import { Copy, Share2, Trash2 } from "lucide-react";
import { Content } from "@/types/ContentTypes";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import '@mariusbongarts/previewbox/dist/link/index';
import { useGenerateShareLink } from "@/queries/share.query";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";

export function ContentCard({ content }: { content: Content }) {
    const [share, setShare] = useState();
    const link = useGenerateShareLink();
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
                title: response?.message || 'Brainmark deleted successfully',
            })
            queryClient.invalidateQueries({ queryKey: ['contents'] })
        }
    })
    return (
        <Card key={content?._id} className="max-w-sm">
            <CardHeader className="flex flex-row justify-between">
                <CardTitle className="flex gap-2 items-center" >
                    {renderIcon(content?.type?.name?.toLowerCase())}
                    {content?.title?.substring(0, 25)}
                </CardTitle>
                <div className="flex gap-2 items-center text-muted-foreground">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant={'ghost'} onClick={() => {
                                link.mutate(content._id, {
                                    onSuccess: (response) => {
                                        setShare(response?.shareableLink)
                                    }
                                });
                                // setIsOpen(!isOpen);
                            }}>
                                <Share2 size={"lg"} />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Here is your shareable link!</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This link will be expired in 3 days.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex items-center gap-2">
                                <Input className="text-black" value={share} disabled /> <Button
                                    onClick={() => {
                                        window.navigator.clipboard.writeText(share)
                                        toast({
                                            title: 'Link copied to clipboard',
                                        })
                                    }
                                    }
                                > <Copy /> Copy </Button>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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





