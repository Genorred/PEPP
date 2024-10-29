import React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { settings } from "../consts";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "@/entities/User/model/user.slice";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import { usePathname } from "next/navigation";

export const UserTooltip = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch()
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const user = useSelector(userSlice.selectors.user)
  const logout = () => {
    dispatch(userSlice.actions.setUser(null))
  }
  const pathname = usePathname();
  console.log(user, 'user')
  return (
    <>

      { user
      ?
        <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user.username} src={user.picture} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <Link href={`/${setting.toLowerCase()}`} key={setting}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                </MenuItem>
              </Link>
            ))}
            <Divider />
            <MenuItem onClick={logout}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      :
        <Box sx={{ marginLeft: 'auto', display: { xs: "none", sm: "flex" } }}>
          <Link href={`/sign-up${pathname ? '?returnUrl=' + pathname : ''}`}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Sign up
            </Button>
          </Link>
          <Link href={`/sign-in${pathname ? '?returnUrl=' + pathname : ''}`}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Sign in
            </Button>
          </Link>
        </Box>
      }
    </>
  );
};