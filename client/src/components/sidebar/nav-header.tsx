"use client"

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Bot } from "lucide-react"

export function NavHeader() {
  return (
    <>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarMenuButton 
            size="lg" 
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <a href="/" className="flex items-center gap-2">
              <div className="bg-emerald-800 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Bot className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Indecisive AI</span>
              </div>
            </a>
          </SidebarMenuButton>
        </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  )
}
