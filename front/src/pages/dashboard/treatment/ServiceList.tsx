import React from 'react';
import { Scissors, Clock, DollarSign } from 'lucide-react';

const ServiceList = () => {
  const services = [
    {
      id: '1',
      name: 'Corte Degradê',
      price: 45.0,
      duration: 30,
      description: 'Corte moderno com máquina e tesoura',
    },
    {
      id: '2',
      name: 'Barba',
      price: 35.0,
      duration: 20,
      description: 'Acabamento com navalha',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Serviços</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Scissors className="w-4 h-4" />
          Novo Serviço
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <Scissors className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">{service.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-700">
                <DollarSign className="w-4 h-4" />
                <span>R$ {service.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-700">
                <Clock className="w-4 h-4" />
                <span>{service.duration} min</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="text-blue-600 hover:text-blue-800">
                Editar
              </button>
              <button className="text-red-600 hover:text-red-800">
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;