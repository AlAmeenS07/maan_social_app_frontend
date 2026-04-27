import { Link, useNavigate } from "react-router-dom";
import Button from "../../compponents/Button";
import { useDispatch, useSelector } from "react-redux";
import type { UserState } from "../../store/slices/user.slice";
import { logoutUserService } from "../../services/user/auth.service";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const user: any = useSelector((state: UserState) => state.user)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔝 NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-purple-600">MaaN</h1>

        {user.accessToken ?
          <button
            onClick={async () => await logoutUserService(navigate, dispatch)}
            className="text-red-600 hover:text-red-600"
          >
            Logout
          </button>
          :
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-600 hover:text-purple-600"
            >
              Login
            </button>

            <Button
              onClick={() => navigate("/register")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
            >
              Sign Up
            </Button>
          </div>
        }

      </div>

      {/* 🚀 HERO SECTION */}
      <div className="grid grid-cols-2 items-center px-12 py-16">

        {/* LEFT */}
        <div>
          <h2 className="text-4xl font-bold mb-4">
            Build Something <span className="text-purple-600">Amazing</span>
          </h2>

          <p className="text-gray-500 mb-6">
            A modern authentication system with OTP verification,
            clean UI, and scalable architecture.
          </p>

          {
            user.accessToken ? "" :
              <div className="flex gap-4">
                <Button
                  onClick={() => navigate("/register")}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                >
                  Get Started →
                </Button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 border rounded-lg hover:bg-gray-100"
                >
                  Login
                </button>
              </div>
          }

        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <div className="w-80 h-80 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-3xl opacity-80 blur-2xl"></div>
        </div>
      </div>

      {/* ⭐ FEATURES */}
      <div className="px-12 py-12">
        <h3 className="text-2xl font-semibold text-center mb-10">
          Features
        </h3>

        <div className="grid grid-cols-3 gap-6">

          {[
            {
              title: "Secure Auth",
              desc: "JWT + OTP based authentication system",
            },
            {
              title: "Modern UI",
              desc: "Clean and responsive design with Tailwind",
            },
            {
              title: "Scalable",
              desc: "Redux + API architecture ready for growth",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-semibold mb-2 text-purple-600">
                {item.title}
              </h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 📢 CTA */}
      <div className="px-12 py-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">
          Ready to get started?
        </h3>

        {
          user.accessToken ? "" :
            <Button
              onClick={() => navigate("/register")}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
            >
              Create Account →
            </Button>
        }

      </div>

      {/* 🔻 FOOTER */}
      <div className="text-center text-sm text-gray-400 pb-6">
        © 2026 MaaN. All rights reserved.
      </div>
    </div>
  );
}