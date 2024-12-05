import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Overview from "../pages/dashboard/content/overview/Overview";
import SingIn from "../pages/auth/signIn";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AuthProvider } from "../context/AuthProvider";
import BarbershopContent from "../pages/dashboard/content/barbershop";
import { DashboardProvider } from "../context/DashboardProvider";
import ClientContent from "../pages/dashboard/content/client";
import SingUp from "../pages/auth/signUp";
import BarberContent from "../pages/dashboard/content/barber";
import SchedulingContent from "../pages/dashboard/content/scheduling";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    path: "/sign-in",
    element: <SingIn />,
  },
  {
    path: "/sign-up",
    element: <SingUp />,
  },
  {
    path: "/",
    element: <ProtectedRoute redirectTo="/sign-in" />,
    children: [
      {
        path: "dashboard",
        element: (
          <DashboardProvider>
            <Dashboard />
          </DashboardProvider>
        ),
        children: [
          { path: "", element: <Overview /> },
          { path: "scheduling", element: <SchedulingContent /> },
          { path: "barber", element: <BarberContent /> },
          { path: "clients", element: <ClientContent /> },
          { path: "history", element:  <></>},
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
