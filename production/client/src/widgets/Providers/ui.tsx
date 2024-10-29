import React, { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ClientProviders } from "@/widgets/Providers/clientProviders";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AppRouterCacheProvider>
        <ClientProviders>
          {children}
        </ClientProviders>
    </AppRouterCacheProvider>
  );
};

export default Providers;