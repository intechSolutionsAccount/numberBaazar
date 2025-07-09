
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLogo } from "./app-logo";

export function Footer() {
  const handleSocialClick = (platform: string) => {
    // Placeholder URLs - replace with actual social media links
    const urls = {
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
      linkedin: "https://linkedin.com/",
      whatsapp: "https://wa.me/9158585858"
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AppLogo size="xl" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your one-stop solution for exclusive VIP numbers. Premium mobile numbers for the distinguished.
            </p>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick('facebook')}
                className="hover:bg-skyBlue/10"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick('instagram')}
                className="hover:bg-skyBlue/10"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleSocialClick('twitter')}
                className="hover:bg-skyBlue/10"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/premium" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Premium Numbers
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cart
              </Link>
            </nav>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal & Support</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms and Conditions
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </a>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2013 Number Baazar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
