import AppointmentCalendar from '../components/AppointmentCalendar';

export default function Overview() {
    return (
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
    )
}