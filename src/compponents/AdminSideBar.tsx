// components/layout/Sidebar.jsx
import { Home, Users, FileText, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminLogoutService } from "../services/admin/admin.auth.service";
import { useDispatch } from "react-redux";

const menu = [
  { name: "Dashboard", icon: Home, to: "/admin/dashboard" },
  { name: "User Management", icon: Users, to: "/admin/users" },
  { name: "Posts & Content", icon: FileText, to: "/admin/posts" },
];

export default function AdminSidebar() {
  const location = useLocation();

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async() => {
    await adminLogoutService(navigate , dispatch)
  };

  return (
    <div className="w-64 h-screen bg-white border-r p-4 flex flex-col">

      {/* TOP */}
      <div>
        <h1 className="text-green-600 font-bold text-xl mb-6">
          MaaN
        </h1>

        {menu.map((item) => {
          const isActive = location.pathname.startsWith(item.to);

          return (
            <Link
              to={item.to}
              key={item.name}
              className={`flex items-center gap-3 p-2 rounded-lg transition ${
                isActive
                  ? "bg-green-100 text-green-600 font-medium"
                  : "text-gray-600 hover:bg-green-50"
              }`}
            >
              <item.icon
                size={18}
                className={isActive ? "text-green-600" : "text-gray-500"}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* BOTTOM (Logout) */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}