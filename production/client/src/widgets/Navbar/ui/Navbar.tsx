"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { UserTooltip } from "@/widgets/Navbar/ui/UserTooltip";
import { NavDrawer } from "@/widgets/Navbar/ui/NavDrawer";
import { NavPages } from "@/widgets/Navbar/ui/NavPages";
import LogoIcons from "./LogoIcons";


function Navbar() {
  return (
    <>
      <AppBar position="static" component={"nav"}>
        <Container maxWidth="xl">
          <Toolbar>
            <NavDrawer />
            <LogoIcons />
            <NavPages />
            <UserTooltip />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;