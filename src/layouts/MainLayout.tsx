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
            <SidebarInset className='flex flex-col gap-2overflow-hidden h-screen'>
                <Header />
                <main className="flex-1 space-y-4 py-3 px-4 overflow-hidden h-full">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default MainLayout