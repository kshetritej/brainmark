import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { renderIcon } from "@/lib/render-icon";
import {  Share2,  Trash2 } from "lucide-react";
import { Content } from "@/types/ContentTypes";

export function ContentCard({ content }: { content: Content }) {
    return (
            <Card  key={content._id} className="w-full m-4">
                <CardHeader className="flex flex-row justify-between">
                    <CardTitle className="flex gap-2 items-center" >
                        {renderIcon(content?.type?.name.toLowerCase())}
                        {content?.title.substring(0, 25)}
                    </CardTitle>
                    <div className="flex gap-2 items-center text-muted-foreground">
                        <Share2 />
                        <Trash2 />
                    </div>
                </CardHeader>
                <CardContent>
                    {content?.content}
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