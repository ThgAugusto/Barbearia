import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import ClientList from '../pages/dashboard/content/ClientList';
import SchedulingCalendar from "../pages/dashboard/content/SchedulingCalendar";
import ServiceList from "../pages/dashboard/content/ServiceList";
import Overview from "../pages/dashboard/content/Overview";
import Login from "../pages/auth/login";
import ProtectedRoute from "../components/ProtectedRoute";



export const Router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "scheduling",
        element: <SchedulingCalendar />,
      },
      {
        path: "services",
        element: <ServiceList />,
      },
      {
        path: "clients",
        element: <ClientList />,
      },
      {
        path: "history",
        element: <ClientList />,
      },
    ]
  }
]);
