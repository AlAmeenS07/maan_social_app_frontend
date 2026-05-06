// components/layout/AdminLayout.jsx
import type { ReactNode } from "react";
import AdminHeader from "../compponents/AdminHeader";
import AdminSidebar from "../compponents/AdminSideBar";

export default function AdminLayout({ children } : { children : ReactNode}) {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">
        <AdminHeader />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}