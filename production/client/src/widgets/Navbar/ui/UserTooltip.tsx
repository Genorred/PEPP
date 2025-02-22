import React, { useEffect } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import { usePathname } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/shared/ui/navigation-menu";
import { navSettings } from "@/widgets/Navbar/consts";
import { useLogoutMutation } from "@/shared/api/graphql/generated";
import { toast } from "sonner";

export const UserTooltip = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const user = useSelector(userSlice.selectors.user);
  useEffect(() => {
    if (user && (user.expireDate - Date.now()) < 1) {
      toast.error("Session expired, please auth again");
      dispatch(userSlice.actions.setUser(null));
    }
  }, [user]);
  const { mutate: revokeToken } = useLogoutMutation({
    onSuccess: () => {
      dispatch(userSlice.actions.setUser(null));
    }
  });
  const logout = () => {
    revokeToken({});
  };
  const pathname = usePathname();
  console.log(user, "user");
  console.log(user && (user.expireDate - Date.now()));
  return (
    <div className="ml-auto flex items-center space-x-4">
      {user
        ?
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.img} alt="@shadcn" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  {navSettings.map(([name, Icon, href]) => (
                    <Link key={name} href={`/${href}`}>
                      <DropdownMenuItem>
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{name}</span>
                      </DropdownMenuItem>
                    </Link>
                  ))
                  }
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent>
              <p>Account settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        :
        <NavigationMenu>
          <NavigationMenuList>
            {
              !pathname.includes("sign-up") ?
                <NavigationMenuItem>
                  <Link href={`/sign-up${pathname ? "?returnUrl=" + pathname : ""}`} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <span>Sign up</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem> : null
            }
            {
              !pathname.includes("sign-in") ?
                <NavigationMenuItem>
                  <Link href={`/sign-in${pathname ? "?returnUrl=" + pathname : ""}`} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Sign in</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem> : null
            }
          </NavigationMenuList>
        </NavigationMenu>
      }
    </div>
  )
    ;
};