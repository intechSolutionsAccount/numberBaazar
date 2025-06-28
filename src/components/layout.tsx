
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, Home, Award, Contact, Shield, Grid3X3 } from "lucide-react";
import { ThemeProvider } from "./theme-provider";
import { Header } from "./header";
import { Footer } from "./footer";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { AdminLoginModal } from "./admin-login-modal";
import { FixedWhatsAppButton } from "./fixed-whatsapp-button";
import { AppLogo } from "./app-logo";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Premium Numbers", href: "/premium", icon: Award },
    { name: "Categories", href: "/#categories", icon: Grid3X3 },
    { name: "Contact Us", href: "/contact", icon: Contact },
  ];

  const handleLinkClick = (href: string) => {
    setOpen(false);
    if (href === "/#categories") {
      // Navigate to home first if not already there
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const categoriesElement = document.getElementById("categories");
          if (categoriesElement) {
            categoriesElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const categoriesElement = document.getElementById("categories");
        if (categoriesElement) {
          categoriesElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const handleAdminLoginClick = () => {
    setOpen(false);
    setAdminLoginOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Sheet open={open} onOpenChange={setOpen}>
          <Header>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
          </Header>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <div className="flex items-center gap-2">
                <AppLogo size="xl" />
              </div>
            </SheetHeader>
            <nav className="mt-8 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href === "/#categories" && location.pathname === "/" && location.hash === "#categories");
                
                if (item.href.startsWith("/#")) {
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleLinkClick(item.href)}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors w-full text-left ${
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.name}</span>
                    </button>
                  );
                }
                
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`
                    }
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
              
              <div className="pt-4 border-t border-border mt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 h-auto font-normal"
                  onClick={handleAdminLoginClick}
                >
                  <Shield className="mr-3 h-5 w-5" />
                  <span>Admin Login</span>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <AdminLoginModal open={adminLoginOpen} onOpenChange={setAdminLoginOpen} />
        <FixedWhatsAppButton />

        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}
