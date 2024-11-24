import { Brain, LogOut, User } from "lucide-react";
import { AppDrawer } from "./add-drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "@tanstack/react-router";


export function Navbar() {
    return (
        <div className='m-4 bg-secondary-foreground text-secondary  border-b flex justify-between items-center p-4 fixed w-[90%]  rounded-full bottom-0 z-42'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <h1 className='text-lg font-medium flex gap-2 items-center'><Brain /> </h1>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Add New Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Tweet</DropdownMenuItem>
                    <DropdownMenuItem>Video</DropdownMenuItem>
                    <DropdownMenuItem>Link</DropdownMenuItem>
                    <DropdownMenuItem>Documents</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AppDrawer />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Link to="/auth">
                        <User />
                    </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-lg">
                    <DropdownMenuLabel>Username</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><LogOut /> Log Out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}