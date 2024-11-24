import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { renderIcon } from "@/lib/render-icon";

interface Tag {
    _id: string;
    name: string;
}

interface PostType {
    _id: string;
    name: string;
}

export interface Content {
    _id: string;
    title: string;
    content: string;
    author: string;
    tags: Tag[];
    type: PostType;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export function ContentCard({ content }: { content: Content[] }) {
    return (
        <>
            {content?.map(content => {
                return (
                    <Card className="m-4">
                        <CardHeader >
                            <CardTitle className="flex justify-between">{content.title}
                            <Badge variant={'outline'} className="rounded-full ">{renderIcon(content.type.name.toLowerCase())}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {content.content}
                        </CardContent>
                        <CardFooter>
                            <CardDescription className="flex gap-2">{content.tags.map(tag =>
                                <Badge variant={'secondary'} className="rounded-full">{tag.name}</Badge>
                            )}
                            </CardDescription>
                        </CardFooter>
                    </Card>

                )
            })}
        </>
    )
}