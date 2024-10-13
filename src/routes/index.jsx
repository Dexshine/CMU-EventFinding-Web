import { createBrowserRouter } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./LoginRoutes";
import { BASE_URL } from "../config/config-variable";
import GuestRoutes from "./GuestRoute";

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([LoginRoutes, MainRoutes, GuestRoutes], {
  basename: BASE_URL,
});
export default router;

export const paths = {
  root: "/",
  dashboard: "/dashboard",
  profile: "/profile",

  event: {
    root: "/event",
    edit: (id) => `/event/${id}/edit`,
    create: "/event/create",
    view: (id) => `/event/${id}`,
  },
};
