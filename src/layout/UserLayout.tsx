// // layouts/MainLayout.tsx

import { type ReactNode, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useLogout } from "../hooks/user/auth/useLogout";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../compponents/UserSidebar";
import { useClickOutside } from "../hooks/common/useClickOutside";
import RightSection from "../compponents/RightSection";

interface Props {
    children: ReactNode;
}

export default function UserLayout({ children }: Props) {
    const { mutate } = useLogout();

    const [open, setOpen] = useState(false);
    const [mobileSidebar, setMobileSidebar] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()

    const user = useSelector((store: RootState) => store.user.user)

    const replaced = location.pathname.replace("/", "")

    const pageTitle = location.pathname === "/" ? "Home"
        : location.pathname
            .replace("/", "")
            .charAt(0)
            .toUpperCase() +
        location.pathname
            .replace("/", "")
            .slice(1, replaced.includes("/") ? replaced.indexOf("/") : replaced.length);

    useClickOutside(dropdownRef, () => setOpen(false));

    async function logout() {
        const result = await Swal.fire({
            title: "Logout?",
            text: "You will be signed out.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            mutate()
        }
    }

    return (

        <div className="h-screen bg-[#f5f5f7] flex overflow-hidden">
            {/* MAIN */}
            <div className="flex flex-1">

                {/* SIDEBAR */}
                <UserSidebar />

                {/* CONTENT */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* TOPBAR */}
                    <div className="sticky top-0 z-50 bg-white border-b px-4 md:px-8 py-4 flex justify-between items-center">

                        <div className="flex items-center gap-3">

                            {/* MOBILE SIDEBAR BUTTON */}
                            <button
                                onClick={() => setMobileSidebar(true)}
                                className="md:hidden text-2xl"
                            >
                                ☰
                            </button>

                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                {pageTitle}
                            </h2>

                        </div>

                        {/* PROFILE */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-3 transition-transform duration-200 hover:scale-105"
                            >
                                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold uppercase transition-transform duration-200 hover:-translate-y-1 hover:scale-110">
                                    {user?.name.charAt(0) || ''}
                                </div>

                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-semibold text-gray-700">
                                        {user?.name || ''}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {user?.email || ''}
                                    </p>
                                </div>
                            </button>

                            {/* DROPDOWN */}
                            {open && (
                                <div className="absolute right-0 top-14 w-52 bg-white rounded-2xl shadow-xl border overflow-hidden z-50">

                                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
                                        onClick={() => navigate("/profile")}>
                                        Profile
                                    </button>

                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PAGE CONTENT + RIGHT SIDEBAR */}
                    <div className="flex-1 overflow-y-auto">

                        <div className="flex gap-16 p-4 md:p-8 justify-center">

                            <div className="w-[780px] flex-shrink-0">
                                {children}
                            </div>

                            <div className="sticky top-6 self-start">
                                <RightSection />
                            </div>

                        </div>

                    </div>

                </main>

            </div>

            {/* MOBILE SIDEBAR */}
            {mobileSidebar && (
                <div className="fixed inset-0 z-[100] md:hidden">

                    {/* BACKDROP */}
                    <div
                        onClick={() => setMobileSidebar(false)}
                        className="absolute inset-0 bg-black/40"
                    />

                    {/* SIDEBAR */}
                    <UserSidebar mobile onClose={() => setMobileSidebar(false)} />
                </div>
            )}

        </div>
    );
}


