import { lazy } from "react";

import NavMotion from "../layout/NavMotion";
import MinimalLayout from "../layout/minimal";
import GuestGuard from "../utils/route-guard/GuestGuard";
import { Outlet } from "react-router-dom";
import AuthCMU from "../pages/auth-cmu";
import LoginPage from "../pages/login";

// login routing
// const LoginPage = lazy(() => import("../pages/login"));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: (
    <NavMotion>
      <GuestGuard>
        <MinimalLayout>
          <Outlet />
        </MinimalLayout>
      </GuestGuard>
    </NavMotion>
  ),
  children: [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "cmuOAuthCallback",
      element: <AuthCMU />,
    },
  ],
};

export default LoginRoutes;
