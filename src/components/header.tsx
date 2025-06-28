
import { ShoppingCart } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AppLogo } from "./app-logo";
import { useCart } from "@/hooks/use-cart";
import { Link } from "react-router-dom";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const { cart } = useCart();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container p-2 flex h-16 items-center">
        <div className="flex items-center gap-2">
          {children}
          <Link to="/" className="flex items-center gap-2">
            <AppLogo size="lg" />
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-skyBlue hover:bg-skyBlue">
                  {cart.length}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
