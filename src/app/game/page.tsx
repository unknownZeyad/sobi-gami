'use client'
import Admin from "@/features/admin/features/page";
import AdminProviders from "@/features/admin/providers";

export default function AdminPage() {
  return (
    <AdminProviders>
      <Admin />
    </AdminProviders>
  );
}
