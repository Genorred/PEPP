"use client";
import * as React from "react";
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
import { useHidingNavbar } from "@/widgets/Navbar/ui/useHidingNavbar";
import { useGetUserNotifications } from "@/widgets/Navbar/model/useGetNotifications";

function Navbar() {
  const { topPosition } = useHidingNavbar();
  useGetUserNotifications();
  return (
    <nav className="border-b w-full h-16">
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