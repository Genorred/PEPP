import React, { PropsWithChildren } from "react";
import { ClientProviders } from "@/widgets/Providers/clientProviders";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ClientProviders>
      {children}
    </ClientProviders>
  );
};

export default Providers;