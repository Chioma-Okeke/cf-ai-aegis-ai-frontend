import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";

export function Header() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <div className="flex flex-1 items-center gap-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Search className="size-4" />
                        <span className="sr-only">Search</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Bell className="size-4" />
                        <span className="sr-only">Notifications</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <User className="size-4" />
                        <span className="sr-only">User menu</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}