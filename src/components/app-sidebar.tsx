import { BicepsFlexed,  FolderKanban, HandMetal,  Home, Inbox } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Nazal Panel</SidebarGroupLabel>
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
