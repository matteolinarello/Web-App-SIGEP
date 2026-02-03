import { createBrowserRouter } from "react-router";
import Root from "@/app/components/Root";
import Home from "@/app/pages/Home";
import VisitorDashboard from "@/app/pages/VisitorDashboard";
import ExhibitorDashboard from "@/app/pages/ExhibitorDashboard";
import IEGDashboard from "@/app/pages/IEGDashboard";
import NotFound from "@/app/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "visitor", Component: VisitorDashboard },
      { path: "exhibitor", Component: ExhibitorDashboard },
      { path: "ieg", Component: IEGDashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
