import { lazy } from "react";
import MainLayout from "../layout/main";
import GuestGuard from "../utils/route-guard/GuestGuard";
// import EventPage from "../pages/event";
import HomePage from "../pages/home";
import { Outlet } from "react-router-dom";
import EventViewPage from "../pages/event/view";

const EventPage = lazy(() => import("../pages/event"));

// ==============================|| MAIN ROUTING ||============================== //

const GuestRoutes = {
  path: "/",
  element: (
    <GuestGuard>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </GuestGuard>
  ),
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "event",
      children: [
        {
          element: <EventPage />,
          index: true,
        },
        {
          path: ":id",
          element: <EventViewPage />,
        },
      ],
    },

    {
      path: "*",
      element: <h1>404 Not Found</h1>,
    },
  ],
};

export default GuestRoutes;
