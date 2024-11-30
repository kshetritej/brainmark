import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { renderIcon } from "@/lib/render-icon"
import { useGetContentByType } from "@/queries/content.query"
import { useGetAllTypes } from "@/queries/type.query"
import { Link } from "@tanstack/react-router"
import { Brain, Hash, User } from "lucide-react"


export function AppSidebar() {
    const types = useGetAllTypes().data?.types;
    const userIsLoggedIn = localStorage.getItem('token') !== null;
    const menuItems = types?.map((type: any) => {
        return {
            id: type._id,
            name: type.name,
        }
    })
    return (
        <Sidebar>
            <SidebarHeader className="text-2xl font-medium">
                <Link to="/" className="flex flex-row gap-2 items-center">
                    <Brain /> Brainmark
                </Link>
            </SidebarHeader>
            <SidebarContent>
                {userIsLoggedIn &&
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    {
                        menuItems?.map((item) =>
                            <Link to="/content/$typeId" params={{ typeId: item.id }}>
                                <SidebarMenuButton className="py-8"
                                >{renderIcon(item.name.toLowerCase())} <span>{item.name}s</span></SidebarMenuButton>
                            </Link>
                        )
                    }
                    <Link to="/tags">
                        <SidebarMenuButton className="py-8"><Hash /> Tags</SidebarMenuButton>
                    </Link>
                </SidebarGroup>
                
                }
                <SidebarGroup>
                    <Link to="/auth/profile">
                        <SidebarMenuButton className="py-8"><User size={42} /> Profile</SidebarMenuButton>
                    </Link>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
