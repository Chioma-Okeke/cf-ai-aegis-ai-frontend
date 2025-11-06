import { Outlet } from 'react-router-dom'
import {
    SidebarProvider,
    SidebarInset
} from '../components/ui/sidebar'
import { AppSidebar } from '@/components/shared/sidebar'
import { Header } from '@/components/shared/header'

function MainLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='flex flex-col gap-2 overflow-hidden h-screen transition-[margin] duration-300 ease-in-out'>
                <Header />
                <main className="flex-1 py-3 px-4 overflow-hidden">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default MainLayout