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
import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import axios from "axios"
import { Brain, Hash, Home, Icon, User } from "lucide-react"


export function AppSidebar() {
    const { data: types } = useQuery({
        queryKey: ['types'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/type/all')
            return res.data.types
        }
    })
    const menuItems = types?.map((type: any) => {
        return {
            name: type.name,
        }
    })
    return (
        <Sidebar>
            <SidebarHeader className="flex flex-row gap-2 items-center text-2xl font-medium">
                <Brain /> Brainmark
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    {
                        menuItems?.map((item) =>
                            <SidebarMenuButton className="py-8">{renderIcon(item.name.toLowerCase())} <span>{item.name}s</span></SidebarMenuButton>
                        )
                    }
                            <SidebarMenuButton className="py-8"><Hash size={42}/> Tags</SidebarMenuButton>
                            <Link to="/auth">
                            <SidebarMenuButton className="py-8"><User size={42}/> Profile</SidebarMenuButton>
                            </Link>

                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
