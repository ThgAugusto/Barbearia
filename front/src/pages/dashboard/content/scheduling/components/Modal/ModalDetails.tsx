import { Modal, Card, Dropdown } from "flowbite-react";
import { Clock, User, Scissors, EllipsisVertical, Ban, CircleCheckBig } from "lucide-react";
import { Scheduling } from "../../../../../../types/scheduling";
import React from "react";

interface SchedulingModalProps {
    show: boolean;
    onClose: () => void;
    schedulings: Scheduling[];
    barbersData: {
        id: number;
        name: string;
    }[]
    markAsCompleted: (id: number) => Promise<void>
    softDelete: (id: number) => Promise<void>
}

const SchedulingDetailsModal: React.FC<SchedulingModalProps> = ({
    show,
    onClose,
    schedulings,
    barbersData,
    markAsCompleted,
    softDelete
}) => {
    const [selectedBarber, setSelectedBarber] = React.useState<number | null>(null);

    const filteredSchedulings = selectedBarber
        ? schedulings.filter((scheduling) => scheduling.barberId === selectedBarber)
        : schedulings;

    if (!schedulings || schedulings.length === 0) {
        return null;
    }


    const SchedulingActionsDropdown: React.FC<{ scheduling: Scheduling }> = ({ scheduling }) => (
        <Dropdown
            className="absolute w-[165px]"
            arrowIcon={false}
            label={<EllipsisVertical className='w-5 h-5' />}
            placement="bottom"
            inline
        >
            <Dropdown.Header>
                <span className="block font-bold">Selecione uma ação</span>
            </Dropdown.Header>

            <Dropdown.Item onClick={() => markAsCompleted(scheduling.id)}>
                <span className="flex items-center text-green-500">
                    <CircleCheckBig strokeWidth={2} className="w-4 h-4 mr-2" />
                    Finalizado
                </span>
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item onClick={() => softDelete(scheduling.id)}>
                <span className="flex items-center text-red-500">
                    <Ban strokeWidth={2} className="w-4 h-4 mr-2" />
                    Cancelar
                </span>
            </Dropdown.Item>
        </Dropdown>
    );

    return (
        <Modal size="xl" show={show} onClose={onClose}>
            <Modal.Header className="bg-cyan-900 ">
                <span className="text-white">Agendamentos do Dia</span>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-4">
                    <label htmlFor="barberSelect" className="block text-sm font-medium text-gray-700">
                        Selecione um Barbeiro
                    </label>
                    <select
                        id="barberSelect"
                        className="block w-full mt-2 p-2 border rounded-md"
                        onChange={(e) => setSelectedBarber(Number(e.target.value))}
                        value={selectedBarber ?? ''}
                    >
                        <option value="">Todos os Barbeiros</option>
                        {barbersData.map((barber) => (
                            <option key={barber.id} value={barber.id}>
                                {barber.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid gap-2">
                    {filteredSchedulings.map((scheduling) => (
                        <Card key={scheduling.id} className="relative p-2 shadow-sm border">
                            {scheduling.status === 'SCHEDULED' && (
                                <div className="absolute right-2 top-2">
                                    <SchedulingActionsDropdown scheduling={scheduling} />
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <div className="flex">
                                    <span className="mr-2 font-medium text-gray-700">
                                        {scheduling.treatment.name} - R$
                                        {scheduling.treatment.price},
                                    </span>
                                    <h4 className="flex items-center font-semibold text-gray-400">
                                        <Clock className="inline-block w-4 h-4 mr-1 text-gray-400" />
                                        {new Date(scheduling.startTime).toLocaleTimeString('pt-BR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            timeZone: 'America/Sao_Paulo',
                                        })}{" "}
                                        -{" "}
                                        {new Date(scheduling.endTime).toLocaleTimeString('pt-BR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            timeZone: 'America/Sao_Paulo',
                                        })}
                                    </h4>
                                </div>
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded ${scheduling.status === "COMPLETED"
                                        ? "bg-green-100 text-green-600"
                                        : scheduling.status === "SCHEDULED" ? "bg-yellow-100 text-yellow-600"
                                            : "bg-red-100 text-yellow-600"}`}
                                >
                                    {scheduling.status}
                                </span>
                            </div>
                            <div className="flex flex-col text-sm text-gray-600 space-y-1">
                                <span>
                                    <User className="inline-block w-4 h-4 mr-1 text-gray-500" />
                                    <strong>{scheduling.client.name}</strong> ({scheduling.client.phone})
                                </span>

                                <span>
                                    <Scissors className="inline-block w-4 h-4 mr-1 text-gray-500" />
                                    {scheduling.barber.user.name}
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SchedulingDetailsModal;
