"use client";

import { ReactNode } from "react";
import AdminSocketProvider from "./admin-socket-provider";
import AdminPhasesProvider from "./admin-phases-provider";
import { AdminDataProvider } from "./admin-data-provider";

function AdminProviders({ children }: { readonly children: ReactNode }) {
  return (
    <AdminSocketProvider>
      <AdminPhasesProvider>
        <AdminDataProvider>{children}</AdminDataProvider>
      </AdminPhasesProvider>
    </AdminSocketProvider>
  );
}

export default AdminProviders;
