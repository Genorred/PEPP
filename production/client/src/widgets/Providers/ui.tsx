import React, { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ClientProviders } from "@/widgets/Providers/clientProviders";

const Providers = ({ children }: PropsWithChildren) => {
  return (
        <ClientProviders>
          {children}
        </ClientProviders>
  );
};

export default Providers;