import React from 'react';
import { User, Phone, Clock, Scissors } from 'lucide-react';

const ClientList = () => {
  const clients = [
    {
      id: '1',
      name: 'João Silva',
      phone: '(11) 99999-9999',
      lastVisit: '2024-03-10',
      totalVisits: 8,
    },
    // Add more mock data as needed
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <User className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Cliente</th>
              <th className="text-left py-3 px-4">Telefone</th>
              <th className="text-left py-3 px-4">Última Visita</th>
              <th className="text-left py-3 px-4">Total Visitas</th>
              <th className="text-left py-3 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    {client.name}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    {client.phone}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    {new Date(client.lastVisit).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-gray-600" />
                    {client.totalVisits} cortes
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      Editar
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      Agendar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;