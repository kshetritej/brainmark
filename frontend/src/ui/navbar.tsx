import { Brain, CircleFadingPlus, Menu, User } from "lucide-react";
import { AppDrawer } from "./add-drawer";

export function Navbar() {
    return (
        <div className='border-b flex justify-between items-center p-4'>
            <h1 className='text-lg font-medium flex gap-2 items-center'><Brain/> Brainmark</h1>
            <Menu />
            <div className="text-secondary absolute right-0 bottom-0 bg-accent-foreground rounded-full m-4">
            <AppDrawer/>
            </div>
        </div>
    )
}