import { CircleFadingPlus, Menu, User } from "lucide-react";

export function Navbar() {
    return (
        <div className='bg-accent-foreground text-secondary flex justify-between items-center p-4'>
            <h1 className='text-4xl font-medium'>Brainmark</h1>
            <Menu />
            <div className="text-secondary absolute right-0 bottom-0 bg-accent-foreground p-4 rounded-full m-4">
                <CircleFadingPlus />
            </div>
        </div>
    )
}