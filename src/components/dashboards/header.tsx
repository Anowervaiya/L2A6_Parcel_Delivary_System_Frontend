"use client"

import { Bell, Moon, Sun, LogOut, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardHeaderProps {
  onThemeToggle: () => void
  theme: "light" | "dark"
  userRole: string
}

export default function DashboardHeader({ onThemeToggle, theme, userRole }: DashboardHeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between gap-4">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <Input placeholder="Search parcels, users..." className="bg-muted/50 border-muted-foreground/20" />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={onThemeToggle}>
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 pl-2 pr-1">
              <Avatar className="w-7 h-7">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2">
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <span>Role: {userRole}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-red-500">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
