import React, { PropsWithChildren } from "react";
import { ClientProviders } from "@/widgets/Providers/ClientProviders";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ClientProviders>
      {children}
    </ClientProviders>
  );
};

export default Providers;