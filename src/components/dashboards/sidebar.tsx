"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, Package, Home, Menu, X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userRole: "sender" | "receiver" | "admin"
}

export default function DashboardSidebar({ open, onOpenChange, userRole }: DashboardSidebarProps) {
  const pathname = usePathname()

  const getMenuItems = () => {
    const baseItems = [
      { label: "Dashboard", href: `/dashboards/${userRole}`, icon: Home },
      { label: "Settings", href: `/dashboards/${userRole}/settings`, icon: Settings },
    ]

    if (userRole === "sender") {
      return [
        baseItems[0],
        { label: "My Parcels", href: "/dashboards/sender/parcels", icon: Package },
        { label: "Create Shipment", href: "/dashboards/sender/create", icon: Package },
        baseItems[1],
      ]
    }

    if (userRole === "receiver") {
      return [baseItems[0], { label: "Incoming", href: "/dashboards/receiver/incoming", icon: Package }, baseItems[1]]
    }

    // Admin
    return [
      baseItems[0],
      { label: "Users", href: "/dashboards/admin/users", icon: Users },
      { label: "Parcels", href: "/dashboards/admin/parcels", icon: Package },
      { label: "Analytics", href: "/dashboards/admin/analytics", icon: BarChart3 },
      baseItems[1],
    ]
  }

  const menuItems = getMenuItems()
  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-0 left-0 z-40 md:hidden p-4">
        <Button variant="ghost" size="icon" onClick={() => onOpenChange(!open)} className="text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative z-30 w-64 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
          !open && "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-primary">Parcel Co.</h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1">Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive(item.href) && "bg-sidebar-primary text-sidebar-primary-foreground",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60">v0 Parcel System</p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => onOpenChange(false)} />}
    </>
  )
}
