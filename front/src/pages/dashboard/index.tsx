import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Scissors, Clock, LayoutDashboard } from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/overview' },
    { icon: Calendar, label: 'Agendamentos', path: '/dashboard/scheduling' },
    { icon: Users, label: 'Clientes', path: '/dashboard/clients' },
    { icon: Scissors, label: 'Serviços', path: '/dashboard/services' },
    { icon: Clock, label: 'Histórico', path: '/dashboard/history' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <div className="h-screen w-64 bg-gray-900 text-white p-4 fixed left-0 top-0">
        <div className="flex items-center gap-2 mb-8">
          <Scissors className="w-8 h-8" />
          <h1 className="text-xl font-bold">BarberPro</h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
