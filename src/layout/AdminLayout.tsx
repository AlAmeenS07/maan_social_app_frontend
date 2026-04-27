// components/layout/AdminLayout.jsx
import AdminHeader from "../compponents/AdminHeader";
import AdminSidebar from "../compponents/AdminSideBar";

export default function AdminLayout({ children } : any) {
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