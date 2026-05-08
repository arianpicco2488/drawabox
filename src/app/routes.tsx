import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
import WarmUpSelector from "./pages/WarmUpSelector";
import WarmUpGallery from "./pages/WarmUpGallery";
import Drawings from "./pages/Drawings";

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
  {
    path: "/drawings",
    Component: Drawings,
  },
]);