// import { Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../store/store";

// import Home from "../pages/user/Home";
// import Login from "../pages/user/Login";
// import Register from "../pages/user/Register";
// import ForgotPassword from "../pages/user/ForgotPassword";
// import ResetPassword from "../pages/user/ResetPassword";
// import Otp from "../pages/user/Otp";
// import Explore from "../pages/user/Explore";
// import Messages from "../pages/user/Messages";
// import Notifications from "../pages/user/Notifications";
// import UserProfile from "../pages/user/UserProfile";

// function UserRoutes() {
//   const user = useSelector((state: RootState) => state.user);
//   const isAdmin = user.user?.is_admin;

//   return (
//     <Routes>

//       <Route path="/" element={ user?.accessToken && !isAdmin ? <Home /> : <Navigate to="/login" replace/> } />
//       <Route path="/explore" element={ user?.accessToken && !isAdmin ? <Explore /> : <Navigate to="/login" replace /> } />
//       <Route path="/messages" element={ user?.accessToken && !isAdmin ? <Messages /> : <Navigate to="/login" replace /> } />
//       <Route path="/notifications" element={ user?.accessToken && !isAdmin ? <Notifications /> : <Navigate to="/login" replace /> } />
//       <Route path="/profile" element={ user?.accessToken && !isAdmin ? <UserProfile /> : <Navigate to="/login" replace /> } />

//       <Route path="/login" element={ !user?.accessToken ? <Login /> : <Navigate to="/" /> } />
//       <Route path="/register" element={ !user?.accessToken ? <Register /> : <Navigate to="/" /> } />

//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/verify-otp" element={<Otp />} />
//       <Route path="/reset-password" element={<ResetPassword />} />
//     </Routes>
//   );
// }

// export default UserRoutes;



import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../store/store";

import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import ForgotPassword from "../pages/user/ForgotPassword";
import ResetPassword from "../pages/user/ResetPassword";
import Otp from "../pages/user/Otp";
import Explore from "../pages/user/Explore";
import Messages from "../pages/user/Messages";
import Notifications from "../pages/user/Notifications";
import UserProfile from "../pages/user/UserProfile";
import EditProfile from "../pages/user/EditProfile";

function UserRoutes() {

  const user = useSelector(
    (state: RootState) => state.user
  );

  if (!user.authChecked) {
    return null;
  }

  const isAdmin = user.user?.is_admin;

  // WAIT UNTIL AUTH FINISHES
  if (user.loading) {
    return null;
  }

  const isAuthenticated =
    !!user?.accessToken && !isAdmin;

  return (
    <Routes>

      {/* PROTECTED */}
      <Route
        path="/"
        element={
          isAuthenticated
            ? <Home />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/explore"
        element={
          isAuthenticated
            ? <Explore />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/messages"
        element={
          isAuthenticated
            ? <Messages />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/notifications"
        element={
          isAuthenticated
            ? <Notifications />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/profile"
        element={
          isAuthenticated
            ? <UserProfile />
            : <Navigate to="/login" replace />
        }
      />

      <Route path="/profile/:id" element={isAuthenticated ? <EditProfile /> : <Navigate to={"/login"} replace/>} />

      {/* GUEST */}
      <Route
        path="/login"
        element={
          !isAuthenticated
            ? <Login />
            : <Navigate to="/" replace />
        }
      />

      <Route
        path="/register"
        element={
          !isAuthenticated
            ? <Register />
            : <Navigate to="/" replace />
        }
      />

      {/* PUBLIC */}
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/verify-otp"
        element={<Otp />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* FALLBACK */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              isAuthenticated
                ? "/"
                : "/login"
            }
            replace
          />
        }
      />

    </Routes>
  );
}

export default UserRoutes;