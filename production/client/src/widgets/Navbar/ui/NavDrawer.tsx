import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { pages } from "@/widgets/Navbar/consts";
import Link from "next/link";

const drawerWidth = 240;
export const NavDrawer = () => {
  const [isMobileOpen, setIsMobileOpen] = React.useState<boolean>(false);

  const handleDrawerToggle = () => {
    setIsMobileOpen(prev => !prev);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <nav>
        <Drawer
          variant="temporary"
          open={isMobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              MUI
            </Typography>
            <Divider />
            <List>
              {pages.map((item) => (
                <Link href={item.toLowerCase()} key={item}>
                  <ListItem key={item} disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
    </>
  );
};