import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
import WarmUpSelector from "./pages/WarmUpSelector";
import WarmUpGallery from "./pages/WarmUpGallery";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard,
  },
  {
    path: "/warmup",
    Component: WarmUpSelector,
  },
  {
    path: "/gallery",
    Component: WarmUpGallery,
  },
]);