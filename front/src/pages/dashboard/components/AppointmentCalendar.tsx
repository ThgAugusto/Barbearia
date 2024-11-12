import React from 'react';
import { Calendar as CalendarIcon, Clock, User } from 'lucide-react';

const AppointmentCalendar = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Agenda</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {/* Calendar Header */}
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square border rounded-lg p-1 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="text-sm text-gray-600">{(i % 31) + 1}</div>
            {i % 7 === 3 && (
              <div className="mt-1">
                <div className="bg-blue-100 text-blue-800 text-xs rounded p-1 mb-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>14:00</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>João Silva</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentCalendar;