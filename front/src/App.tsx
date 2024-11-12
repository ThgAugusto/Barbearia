import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppointmentCalendar from './components/AppointmentCalendar';
import ClientList from './components/ClientList';
import ServiceList from './components/ServiceList';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Agendamentos Hoje</h3>
                    <p className="text-3xl font-bold text-blue-600">8</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Clientes Ativos</h3>
                    <p className="text-3xl font-bold text-blue-600">156</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Faturamento Mensal</h3>
                    <p className="text-3xl font-bold text-blue-600">R$ 4.850</p>
                  </div>
                </div>
                <AppointmentCalendar />
              </div>
            } />
            <Route path="/appointments" element={<AppointmentCalendar />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/history" element={
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Histórico</h1>
                {/* Add history component here */}
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;