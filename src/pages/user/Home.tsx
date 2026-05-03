
// pages/Home.tsx
import Swal from "sweetalert2";
import { useLogout } from "../../hooks/user/auth/useLogout";

export default function Home() {
  const { mutate } = useLogout();

  async function logout() {
    const result = await Swal.fire({
      title: "Logout?",
      text: "You will be signed out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) mutate();
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔝 NAVBAR */}
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-4 bg-white shadow-sm">
        <h1 className="text-lg sm:text-xl font-bold text-purple-600">MaaN</h1>

          <button
            onClick={logout}
            className="text-red-600 border border-red-500 px-3 py-1 rounded-md hover:bg-red-50 text-sm"
          >
            Logout
          </button>
      </div>

      {/* 🚀 HERO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center px-4 sm:px-6 md:px-10 lg:px-16 py-16 gap-10">

        {/* LEFT */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Build your <span className="text-purple-600">identity</span>  
            <br />
            beyond social media
          </h1>

          <p className="mt-4 text-gray-600 text-sm sm:text-base">
            MaaN is a next-generation platform where you can create,
            connect, and monetize your digital presence — all in one place.
          </p>
        </div>

        {/* RIGHT VISUAL */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-3xl blur-2xl opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 FEATURES */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-16 bg-white">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-10">
          Why MaaN?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            {
              title: "Unified Identity",
              desc: "Create a single powerful profile across platforms.",
            },
            {
              title: "Smart Connections",
              desc: "Connect with people that actually matter.",
            },
            {
              title: "Monetization Ready",
              desc: "Turn your presence into opportunities.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition"
            >
              <h3 className="font-semibold text-purple-600 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>


      {/* 🔻 FOOTER */}
      <div className="text-center text-xs sm:text-sm text-gray-400 py-6">
        © 2026 MaaN. All rights reserved.
      </div>
    </div>
  );
}