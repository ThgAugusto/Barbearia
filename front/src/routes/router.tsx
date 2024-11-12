import { createBrowserRouter, redirect } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import ClientList from '../pages/dashboard/components/ClientList';
import AppointmentCalendar from "../pages/dashboard/components/AppointmentCalendar";
import ServiceList from "../pages/dashboard/components/ServiceList";
import Overview from "../pages/dashboard/components/Overview";

export const Router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/dashboard"),
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path:"",
        element: <Overview />,
      },
      {
      path: "appointments", 
      element: <AppointmentCalendar />,
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
