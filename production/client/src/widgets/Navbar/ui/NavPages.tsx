import Box from "@mui/material/Box";
import Link from "next/link";
import Button from "@mui/material/Button";
import React from "react";
import { pages } from "@/widgets/Navbar/consts";

export const NavPages = () => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
      {pages.map((page) => (
        <Link href={`/${page.toLowerCase()}`} key={page}>
          <Button
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page}
          </Button>
        </Link>
      ))}
    </Box>
  );
};