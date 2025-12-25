import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import UserMenu from "../user-menu"
import { role } from "@/constants/role"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data } = useUserInfoQuery(undefined) as any;

  // Determine which dashboard to show based on user role
  const getDashboardLink = () => {
    if (!data?.data) return null;
    
    const userRole = data.data.role;
    if (userRole === role.ADMIN) return { path: "/admin", label: "Admin Dashboard" };
    if (userRole === role.SENDER) return { path: "/sender", label: "Sender Dashboard" };
    if (userRole === role.RECEIVER) return { path: "/receiver", label: "Receiver Dashboard" };
    return null;
  };

  const dashboardLink = getDashboardLink();

  const navigationLinks = [
    { href: '/', label: 'Home', role: 'PUBLIC' },
    { href: '/about', label: 'About', role: 'PUBLIC' },
    { href: '/admin', label: 'Dashboard', role: role.ADMIN },
    { href: '/sender', label: 'Dashboard', role: role.SENDER },
    { href: '/receiver', label: 'Dashboard', role: role.RECEIVER },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Parcel Co.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white hover:text-purple-400 transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-purple-400 transition-colors">
            About
          </Link>
          <Link to="/#services" className="text-white hover:text-purple-400 transition-colors">
            Services
          </Link>
          <Link to="/#pricing" className="text-white hover:text-purple-400 transition-colors">
            Pricing
          </Link>
          <Link to="/#contact" className="text-white hover:text-purple-400 transition-colors">
            Contact
          </Link>

          {/* Conditional Dashboard Link or User Menu */}
          {data?.data?.email ? (
            dashboardLink && (
              <Link 
                to={dashboardLink.path} 
                className="text-white hover:text-purple-400 transition-colors"
              >
                Dashboard
              </Link>
            )
          ) : null}

          {/* Login or User Menu */}
          {data?.data?.email ? (
            <UserMenu navigationLinks={navigationLinks} data={data?.data} />
          ) : (
            <Button variant="ghost" className="text-white hover:text-purple-400">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md border-t border-white/20 p-4">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-white hover:text-purple-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-purple-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/#services"
              className="text-white hover:text-purple-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/#pricing"
              className="text-white hover:text-purple-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              to="/#contact"
              className="text-white hover:text-purple-400 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile Dashboard/Login Section */}
            {data?.data?.email ? (
              <div className="border-t border-white/20 pt-4">
                {dashboardLink && (
                  <Link
                    to={dashboardLink.path}
                    className="text-white hover:text-purple-400 transition-colors py-2 block mb-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <div className="mt-2">
                  <UserMenu navigationLinks={navigationLinks} data={data?.data} />
                </div>
              </div>
            ) : (
              <div className="border-t border-white/20 pt-4">
                <Link
                  to="/login"
                  className="text-white hover:text-purple-400 transition-colors py-2 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}