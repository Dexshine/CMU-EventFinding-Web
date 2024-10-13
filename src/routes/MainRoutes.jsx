import { lazy } from "react";
import MainLayout from "../layout/main";
import AuthGuard from "../utils/route-guard/AuthGuard";
import EventCreateEditPage from "../pages/event/edit";
import EventPage from "../pages/event";
import { Outlet } from "react-router-dom";
import DashboardPage from "../pages/dashboard";
import ReviewPage from "../pages/review";

// sample page routing
// const EventPage = lazy(() => import("../pages/event"));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </AuthGuard>
  ),
  children: [
    {
      path: "event",
      children: [{ path: "create", element: <EventCreateEditPage /> }],
    },
    {
      path: "review",
      element: <ReviewPage />,
    },
    {
      path: "dashboard",
      element: <DashboardPage />,
    },
  ],
};

export default MainRoutes;
