import { Calendar, ChevronUp, Home, Inbox, Search, Settings, User2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavFooter } from "./nav-footer"
import { NavHeader } from "./nav-header"

export function AppSidebar() {
  return (    
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavHeader></NavHeader>
      </SidebarHeader>
      <SidebarContent>
        <NavMain/>
      </SidebarContent>
      <SidebarFooter>
        <NavFooter/>
      </SidebarFooter>
    </Sidebar>
  )
}