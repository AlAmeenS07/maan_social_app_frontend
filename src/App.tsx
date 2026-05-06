import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingEnd, loadingStart, logout, setUser, type AuthPayload } from "./store/slices/user.slice";
import { logoutApi, refreshTokenApi } from "./api/user/auth.api";
import type { RootState } from "./store/store";

import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ErrorBoundary from "./utils/ErrorBoundary";


export type RefreshApiPayload = {
  success: boolean;
  message: string;
  data: AuthPayload;
};


function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      dispatch(loadingStart());
      try {
        const res = await refreshTokenApi() as RefreshApiPayload
        if (res.success) {
          dispatch(setUser(res.data));
          return
        }
        console.log("app-tsx", res)
      } catch (err: unknown) {
        console.log("app-tsx-error", err)
        if (typeof err === "object" && err !== null && "status" in err) {
          const error = err as { status: number };

          if (error.status === 403) {
            await logoutApi();
            dispatch(logout());
          }
        }
      } finally {
        dispatch(loadingEnd());
      }
    };
    if (!user.accessToken) {
      initAuth();
    }
  }, [dispatch])

  if (user.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-purple-600 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />

          <Route path="/*" element={<UserRoutes />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;