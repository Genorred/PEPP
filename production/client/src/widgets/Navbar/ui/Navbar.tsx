"use client";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/shared/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui/sheet";
import { navPages } from "@/widgets/Navbar/consts";
import Image from "next/image";
import Logo from "@/shared/assets/icon.svg";
import { UserTooltip } from "./UserTooltip";


const MAX_HEIGHT = -64; // Half of navbar height
const HALF_MAX = -32;

function Navbar() {
  const [topPosition, setTopPosition] = useState(0); // State for navbar position
  const lastScrollTop = useRef(0);
  const isMobile = useRef(window.innerWidth < 768);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleResize = () => {
      // Update device type dynamically on resize
      isMobile.current = window.innerWidth < 768;
      setTopPosition(0); // Reset navbar position
    };

    const handleScroll = () => {
      if (!isMobile.current) return;

      const scrollTop = document.documentElement.scrollTop;
      const difference = lastScrollTop.current - scrollTop;

      setTopPosition((prev) => {
        let newValue = prev + difference;
        return Math.min(0, Math.max(newValue, MAX_HEIGHT)); // Clamp between 0 and MAX_HEIGHT
      });

      lastScrollTop.current = scrollTop;
    };

    const handleTouchEnd = () => {
      if (!isMobile.current) return; // Skip logic if not mobile
      // Snap navbar position after scrolling stops
      setTopPosition((prev) => (prev >= HALF_MAX ? 0 : MAX_HEIGHT));
    };

    const scrollListener = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 10); // Debounce for performance
    };

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <nav className="border-b">
      <div className="flex w-full h-16 items-center px-4 fixed transition-all bg-background z-10"
        style={{ top: `${topPosition}px` }}
        >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>
                Access all pages from here.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {navPages.map((item) => (
                <Link
                  key={item}
                  href={"/" + item.toLowerCase()}
                  className="block px-2 py-1 text-lg"
                >
                  {item}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src={Logo.src} width={70} height={70} alt={"logo"} />
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navPages.map((item) => (
                <NavigationMenuItem key={item}>
                  <Link href={"/" + item.toLowerCase()} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <UserTooltip />
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
export default Navbar;