'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import { ChevronsLeftRightEllipsisIcon, CircleSlash2Icon, Home, Inbox, Settings } from "lucide-react"

export default function Layout({ children }) {
  const adminItems = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Students",
      url: "/admin/students",
      icon: Inbox,
    },
    {
      title: "Class",
      url: "/admin/class",
      icon: CircleSlash2Icon,
    },
    {
      title: "Approval",
      url: "approval",
      icon: ChevronsLeftRightEllipsisIcon,
    },
    {
      title: "Settings",
      url: "settings",
      icon: Settings,
    },
  ]
  return (
    <SidebarProvider  className="dark w-full">
      <AppSidebar items={adminItems} />
      <main  className="w-[100%]">
        <SidebarTrigger />
        <div className="m-12">
        {children}
        </div>
     
      </main>
    </SidebarProvider>
  )
}
