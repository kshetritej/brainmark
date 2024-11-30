import { Button } from "@/components/ui/button";
import { useGetAllTags } from "@/queries/tags.query";

export function TagList() {
    const tags = useGetAllTags().data?.tags;
    return (
        <div className="p-4">
        <h2 className="text-xl font-medium">All Tags ({tags?.length})</h2>
            {
                tags?.map((tag: any) => {
                    return (
                        <Button key={tag._id} variant={'secondary'} className="m-2">{tag.name}</Button>
                    )
                })
            }
        </div>
    )
}