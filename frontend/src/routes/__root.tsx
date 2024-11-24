import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Navbar } from '@/ui/navbar'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/ui/app-sidebar'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='bg-primary-foreground'>
                <SidebarTrigger />
                <Outlet/>
                {/* {children} */}
            </main>
        </SidebarProvider>
    )
}
