import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calendar, Users, Scissors, Clock, LayoutDashboard, LayoutList, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/overview', category: null },
    { icon: Scissors, label: 'Estabelecimentos', path: '/dashboard/barbershop', category: 'services' },
    { icon: Calendar, label: 'Agendamentos', path: '/dashboard/scheduling', category: 'services' },
    { icon: Users, label: 'Clientes', path: '/dashboard/clients', category: 'clients' },
    { icon: LayoutList, label: 'Serviços', path: '/dashboard/services', category: 'services' },
    { icon: Clock, label: 'Histórico', path: '/dashboard/history', category: 'history' },
  ] as const;

  const categories = [...new Set(menuItems.filter(item => item.category).map(item => item.category))];

  const renderLink = (item: typeof menuItems[number], isActive: boolean) => (
    <Link
      to={item.path}
      className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${isActive
        ? 'text-white bg-cyan-800'
        : 'text-gray-300 hover:bg-cyan-800'
        }`}
    >
      <item.icon className="w-4 h-4" />
      {!isCollapsed && <span className="text-sm">{item.label}</span>}
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`h-screen bg-cyan-900 text-white px-3 py-6 fixed left-0 top-0 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-56'}`}
      >
        <div className="mb-2 space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Scissors className="w-8 h-8" />
            {!isCollapsed && <h1 className="text-xl font-bold">BarberPro</h1>}
          </div>
          <hr className="border-t-1 border-gray-500 border-opacity-50" />
        </div>

        <nav className="space-y-5">
          <div>
            {renderLink(menuItems[0], location.pathname === menuItems[0].path)}
            <hr className="border-t-1 border-gray-500 border-opacity-50 my-3" />
          </div>

          {categories.map(category => (
            <div key={category}>
              {!isCollapsed && <div className="text-xs text-gray-400 uppercase mb-3">{category}</div>}
              {menuItems
                .filter(item => item.category === category)
                .map((item, index, filteredItems) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <div key={item.path}>
                      {renderLink(item, isActive)}

                      {index === filteredItems.length - 1 && (
                        <hr className="border-t-1 border-gray-500 border-opacity-50 my-3" />
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
          
        </nav>

        <div className='flex justify-center items-center mt-6'>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-10 h-10 bg-cyan-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white"
          >
            {isCollapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <main className={`flex-1 ${isCollapsed ? 'ml-16' : 'ml-56'} p-8 transition-all duration-300`}>
        <Outlet />
      </main>
    </div>
  );
}
