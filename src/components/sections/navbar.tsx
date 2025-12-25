import { Button } from "@/components/ui/button"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router"
import UserMenu from "../user-menu"
import { role } from "@/constants/role"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data } = useUserInfoQuery(undefined) as any;

  // Scroll state
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) { // hero section height approx
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColorClass = isScrolled ? "text-black" : "text-white";

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
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/20 transition-colors duration-300 ${isScrolled ? "bg-white" : "bg-white/10"}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className={`text-2xl font-bold transition-colors duration-300 ${textColorClass}`}>
          Parcel Co.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`hover:text-purple-400 transition-colors ${textColorClass}`}>
            Home
          </Link>
          <Link to="/about" className={`hover:text-purple-400 transition-colors ${textColorClass}`}>
            About
          </Link>
          <Link to="/#services" className={`hover:text-purple-400 transition-colors ${textColorClass}`}>
            Services
          </Link>
          <Link to="/#pricing" className={`hover:text-purple-400 transition-colors ${textColorClass}`}>
            Pricing
          </Link>
          <Link to="/#contact" className={`hover:text-purple-400 transition-colors ${textColorClass}`}>
            Contact
          </Link>

          {/* Conditional Dashboard Link */}
          {data?.data?.email && dashboardLink && (
            <Link to={dashboardLink.path} className={`hover:text-purple-400 transition-colors ${textColorClass}`}>
              Dashboard
            </Link>
          )}

          {/* Login or User Menu */}
          {data?.data?.email ? (
            <UserMenu navigationLinks={navigationLinks} data={data?.data} textColorClass={textColorClass} />
          ) : (
            <Button variant="ghost" className={`hover:text-purple-400 transition-colors ${textColorClass}`}>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className={`${textColorClass} md:hidden`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden backdrop-blur-md border-t border-white/20 p-4 ${isScrolled ? "bg-white" : "bg-black/80"}`}>
          <div className="flex flex-col gap-4">
            <Link to="/" className={`hover:text-purple-400 transition-colors py-2 ${textColorClass}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className={`hover:text-purple-400 transition-colors py-2 ${textColorClass}`} onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/#services" className={`hover:text-purple-400 transition-colors py-2 ${textColorClass}`} onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/#pricing" className={`hover:text-purple-400 transition-colors py-2 ${textColorClass}`} onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link to="/#contact" className={`hover:text-purple-400 transition-colors py-2 ${textColorClass}`} onClick={() => setMobileMenuOpen(false)}>Contact</Link>

            {data?.data?.email ? (
              <div className="border-t border-white/20 pt-4">
                {dashboardLink && (
                  <Link to={dashboardLink.path} className={`hover:text-purple-400 transition-colors py-2 block mb-2 ${textColorClass}`} onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                )}
                <div className="mt-2">
                  <UserMenu  data={data?.data} textColorClass={textColorClass} />
                </div>
              </div>
            ) : (
              <div className="border-t border-white/20 pt-4">
                <Link to="/login" className={`hover:text-purple-400 transition-colors py-2 block ${textColorClass}`} onClick={() => setMobileMenuOpen(false)}>
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
