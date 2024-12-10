import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import Logo from "@/shared/assets/icon.svg";
import React from "react";

const LogoIcon = ({ isMobile = false }: { isMobile?: boolean }) => {
  const display = isMobile ? { xs: "flex", md: "none" } : { xs: "none", md: "flex" };
  return (
    <Link href="/">
      <Typography
        variant={isMobile ? "h5" : "h6"}
        noWrap
        component="span"
        sx={{
          mr: 2,
          display,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
          alignItems: "center"
        }}
      >
        <Box sx={{ display, mr: 1 }}>
          <Image src={Logo.src} width={70} height={70} alt={"logo"} />
        </Box>
        PEPP
      </Typography>
    </Link>
  );
};
export default () => (
  <>
    <LogoIcon />
    <LogoIcon isMobile />
  </>
)