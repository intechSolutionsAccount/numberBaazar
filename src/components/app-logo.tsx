
import { cn } from "@/lib/utils";
import { useTheme } from "./theme-provider";

interface AppLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  alignment?: "left" | "center" | "right";
  className?: string;
  alt?: string;
}

const sizeMap = {
  sm: "h-8 w-auto",
  md: "h-12 w-auto", 
  lg: "h-16 w-auto",
  xl: "h-20 w-auto"
};

const alignmentMap = {
  left: "mx-0",
  center: "mx-auto",
  right: "ml-auto"
};

export function AppLogo({ 
  size = "md", 
  alignment = "left", 
  className,
  alt = "VIPNumbers Logo"
}: AppLogoProps) {
  const { theme } = useTheme();
  
  // Determine which logo to use based on theme
  const getLogoSrc = () => {
    if (theme === "dark") {
      return "images/logoDarkMode.png";
    } else if (theme === "light") {
      return "images/logoLightMode.png";
    } else {
      // System theme - check if user prefers dark mode
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "images/logoDarkMode.png" : "images/logoLightMode.png";
    }
  };

  return (
    <img
      src={getLogoSrc()}
      alt={alt}
      role="img"
      className={cn(
        sizeMap[size],
        alignmentMap[alignment],
        "object-contain transition-opacity duration-200",
        className
      )}
    />
  );
}
