import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import ClientList from '../pages/dashboard/content/client/ClientList';
import SchedulingCalendar from "../pages/dashboard/scheduling/SchedulingCalendar";
import ServiceList from "../pages/dashboard/treatment/ServiceList";
import Overview from "../pages/dashboard/content/overview/Overview";
import SingIn from "../pages/auth/singIn";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthProvider";
import BarbershopContent from "../pages/dashboard/content/barbershop";
import { DashboardProvider } from "../context/DashboardProvider";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    path: "/singIn",
    element: <SingIn />,
  },
  {
    path: "/",
    element: <ProtectedRoute redirectTo="/singIn" />,
    children: [
      {
        path: "dashboard",
        element: (
          <DashboardProvider>
            <Dashboard />
          </DashboardProvider>
        ),
        children: [
          { path: "overview", element: <Overview /> },
          { path: "scheduling", element: <SchedulingCalendar /> },
          { path: "services", element: <ServiceList /> },
          { path: "clients", element: <ClientList /> },
          { path: "history", element: <ClientList /> },
          { path: 'barbershop', element: <BarbershopContent /> }
        ],
      },
    ],
  },
]);

export const Router = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
