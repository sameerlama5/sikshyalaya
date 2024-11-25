import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ChevronsLeftRightEllipsisIcon, CircleSlash2Icon, Home, Inbox, Settings } from "lucide-react"
const adminItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Students",
    url: "students",
    icon: Inbox,
  },
  {
    title: "Class",
    url: "admin/class",
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
export default function Layout({ children }) {
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
