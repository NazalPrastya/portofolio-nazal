import { BicepsFlexed,  FolderKanban, HandMetal,  Home, Inbox } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "~/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Experience",
    url: "/dashboard/experience",
    icon: BicepsFlexed,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Skills",
    url: "/dashboard/skills",
    icon: HandMetal,
  },
  {
    title: "Inbox",
    url: "/dashboard/inbox",
    icon: Inbox,
  },
 
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader >
      <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl ">
        <Image
          src="/favicon.png"
          alt="Logo"
          width={40}
          height={40}
          className="bg-purple-100 dark:bg-white rounded-md"
        />
      </div>
      <div>
        <div className="text-sm font-medium ">Nazal Prastya</div>
        <div className="text-xs text-muted-foreground">Web Developer</div>
      </div>
    </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {items.map((item) => {
                const isActive = pathname === item.url

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={isActive ? "bg-muted text-primary font-semibold" : ""}
                  >
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon className={isActive ? "text-primary" : ""} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
