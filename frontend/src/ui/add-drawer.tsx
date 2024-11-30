import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import * as React from "react"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CircleFadingPlus, Plus } from "lucide-react"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"

export function AppDrawer() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Plus /> Add New
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add item to your Brain</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <ProfileForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild className=" rounded-full">
                <CircleFadingPlus />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add item in your Brain</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DrawerDescription>
                </DrawerHeader>
                <ProfileForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
    const [types, setTypes] = React.useState<any>([])
    const token = localStorage.getItem('token')
    const handleContent = useMutation({
        mutationKey: ['content'],
        mutationFn: async (data: any) => {
            const tags = data.tags.split(',')
            const res = await axios.post('http://localhost:3000/api/content/new', { title: data.title, type: data.type, content: data.content, tags: tags }, {
                headers: {
                    token: token
                }
            })
            return res.data
        },
        onSuccess: (response) => {
            toast({
                title: response.message,
            })
        },
        onError: (error) => {
            toast({
                title: error?.message,
                variant: 'destructive',
            })
        }
    })
    const { register, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            title: "",
            content: "",
            type: "",
            tags: []
        }
    })
    const handleForm = (data: any) => {
        console.log('create data', data)
        handleContent.mutate(data);
    }
    const fetchTypes = async () => await axios.get("http://localhost:3000/api/type/all")
    React.useEffect(() => {
        fetchTypes().then(res => setTypes(res.data.types));
        console.log('types', types);
    }, [])
    return (
        <form onSubmit={handleSubmit(handleForm)} className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" defaultValue="Brainly" {...register("title")} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" {...register("content")} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select onValueChange={(value) => setValue("type", value)}>
                    <SelectTrigger className="w-[full]">
                        <SelectValue placeholder="Content Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            types?.map((type: any) => <SelectItem value={type.name}>{type.name}</SelectItem>)
                        }
                    </SelectContent>
                </Select>

            </div>
            <div className="grid gap-2">
                <Label htmlFor="Tags">Tags</Label>
                <Input id="content" {...register("tags")} />
            </div>
            <Button type="submit">Save</Button>
        </form>
    )
}
