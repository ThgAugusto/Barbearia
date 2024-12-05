import { Clock, User } from "lucide-react";
import { Calendar } from "../../../../../../../components/Calender";
import { SchedulingData } from "../../../../../../../hooks/scheduling/useScheduling";
import { useEffect, useState } from "react";
import { HaircutTools } from "../../../../../../../assets/icons";
import { Create } from "../../../../../../../types/scheduling";

export const ConfirmSchedulingStep = ({
    onBack,
    selections,
    loadAvailableTimes,
    schedulingData,
    onSelect,
    create,
}: {
    onSelect: (time: Date) => void;
    onBack: () => void;
    selections: { barbershop: number | null; client: number | null; barber: number | null; treatment: number | null; time: Date | null; }
    schedulingData: SchedulingData
    loadAvailableTimes: (barberId: number, date: Date, treatmentId: number, barbershopId: number) => Promise<void>
    create: (scheduling: Create) => Promise<void>
}) => {
    const [openReview, setOpenReview] = useState<boolean>(false);
    const [selectionDate, setSelectionDate] = useState<Date | null>(null)

    const handleLoadAvailableTimes = (date: Date) => {
        if (selections.barber && selections.treatment && selections.barbershop) {
            setSelectionDate(date)
            loadAvailableTimes(selections.barber, date, selections.treatment, selections.barbershop);
        }
    };

    const getAvailableTimes = () => {
        if (!schedulingData?.availableTimes) return [];

        const barbershopId = selections.barbershop;
        const barberId = selections.barber;
        const treatmentId = selections.treatment;

        if (barbershopId && barberId && treatmentId && selectionDate) {
            const times = schedulingData.availableTimes[barbershopId]?.[barberId]?.[treatmentId]?.[selectionDate.toISOString()];
            return times ? times : [];
        }
        return [];
    };

    const closePopover = () => {
        const popover = document.querySelector('[data-testid="flowbite-popover"]');
        if (popover) {
            const popoverElement = popover as HTMLElement;
            popoverElement.classList.add('hidden');
        }
    };

    useEffect(() => {
        console.log('useEffect-', selections.time)
    }, [selections])

    const ContentPopover = () => {
        const availableTimes = getAvailableTimes();

        const selectedTime = selections.time ? [selections.time] : [];

        const sortedAvailableTimes = [
            ...selectedTime,
            ...availableTimes
                .filter(time => time.toString() !== selections.time?.toString())
                .sort((a, b) => a.toLocaleString() > b.toLocaleString() ? 1 : -1)
        ];


        return (
            <section>
                <header className="border-b  px-5 py-2 ">
                    <p className="font-semibold text-gray-500">Selecione um Horário:</p>
                </header>
                <div className="py-1">
                    <div className="flex w-80 overflow-x-scroll py-3 px-2">
                        <ul className="flex space-x-1">
                            {sortedAvailableTimes.length > 0 ? (
                                sortedAvailableTimes.map((time: Date, index: number) => {
                                    const isSelected = selections.time && time.toString() === selections.time.toString();

                                    return (
                                        <li
                                            key={index}
                                            className={`p-2 flex items-center justify-center hover:shadow-md hover:border-gray-400 rounded-md border border-gray-200 cursor-pointer ${isSelected ? 'bg-cyan-900 text-white' : ''
                                                }`}
                                            onClick={() => {
                                                onSelect(time);
                                                closePopover()
                                            }}
                                        >
                                            <p className="text-sm flex items-center">
                                                <Clock className="w-4 h-4 mr-1 text-gray-400" />{new Date(time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </li>
                                    );
                                })
                            ) : (
                                <li className="text-gray-500">Nenhum horário disponível</li>
                            )}
                        </ul>
                    </div>
                </div>
            </section>
        );
    };

    return (
        <section className="flex-1 ">
            <div className="px-8 py-5">
                <Calendar
                    content={<ContentPopover />}
                    handleLoadAvailableTimes={handleLoadAvailableTimes} />
            </div>
            <div className="px-8">
                <div className="flex justify-end space-x-3 border-t py-3 ">
                    <button
                        onClick={onBack}
                        className="rounded-lg px-6 py-2 text-xs border text-gray-700 bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                    >
                        Voltar
                    </button>

                    <button
                        disabled={!selections.time}
                        onClick={() => setOpenReview(true)}
                        className={`px-6 py-2 text-xs border text-white  bg-cyan-900 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all ${!selections.time ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                    >
                        Revisar
                    </button>

                </div>
            </div>

            {openReview && selections.time && (
                <div className="absolute inset-0 flex rounded-b-xl items-center justify-center bg-gray-900 bg-opacity-50 z-10">
                    <ConfirmData
                        setOpenReview={setOpenReview}
                        selections={selections}
                        schedulingData={schedulingData}
                        create={create}
                    />
                </div>
            )}
        </section>
    );
};



interface ConfirmDataProps {
    selections: {
        barbershop: number | null;
        client: number | null;
        barber: number | null;
        treatment: number | null;
        time: Date | null;
    };
    schedulingData: SchedulingData;
    setOpenReview: React.Dispatch<React.SetStateAction<boolean>>;
    create: (scheduling: Create) => Promise<void>;
}


const ConfirmData: React.FC<ConfirmDataProps> = ({ selections, schedulingData, setOpenReview, create }) => {
    const { barbershop, client, barber, treatment, time } = selections;

    const selectedBarbershop = barbershop
        ? schedulingData.barbershops.find((b) => b.id === barbershop)
        : null;

    const selectedBarber = barber
        ? schedulingData.barbers[barbershop || 0]?.find((b) => b.id === barber)
        : null;

    const selectedClient = client
        ? schedulingData.clients[barbershop || 0]?.find((c) => c.id === client)
        : null;

    const selectedTreatment = treatment
        ? schedulingData.treatments[barbershop || 0]?.find((t) => t.id === treatment)
        : null;


    const prepareSchedulingData = (): Create | null => {
        if (!time || !selectedBarbershop || !selectedBarber || !selectedClient || !selectedTreatment) {
            return null;
        }

        const startTime = new Date(time);
        if (isNaN(startTime.getTime())) {
            console.error('Invalid time format:', time);
            return null;
        }

        const endTime = new Date(startTime.getTime() + selectedTreatment.duration * 60000);

        return {
            barbershopId: selectedBarbershop.id,
            clientId: selectedClient.id,
            barberId: selectedBarber.id,
            treatmentId: selectedTreatment.id,
            startTime: startTime,
            endTime: endTime,
            notes: '',
        };
    };

    const handleCreate = async () => {
        const schedulingData = prepareSchedulingData();
        if (schedulingData) {
            await create(schedulingData);
            setOpenReview(false);
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    };

    return (
        <div className="absolute bg-white rounded-b-lg bottom-0 left-0 right-0 p-4 space-y-4">
            <div className="flex flex-col space-y-2">
                {(selectedBarbershop || selectedBarber) && (
                    <div className="p-4 shadow-sm flex">
                        <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mr-3 text-sm font-semibold">
                            {selectedBarbershop?.socialReason
                                .split(" ")
                                .map((word) => word[0])
                                .join("")}
                        </div>
                        <div className="flex flex-col ">
                            {selectedBarbershop && (
                                <p className="text-sm font-semibold">{selectedBarbershop.socialReason}, <span className="text-xs">{selectedBarbershop.cnpj}</span></p>
                            )}
                            {selectedBarber && (
                                <p className="text-xs track">com {selectedBarber.user.name}</p>
                            )}
                        </div>
                    </div>
                )}

                {selectedClient && (
                    <div className="p-4 shadow-sm flex items-center">
                        <div className="flex items-center mr-3">
                            <div className="mr-2 w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                                <User className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="">
                            <h3 className="font-semibold text-sm">Cliente</h3>
                            <p className="text-xs ">{selectedClient.name}</p>
                        </div>
                    </div>
                )}

                {selectedTreatment && time && (
                    <div className="p-4 shadow-sm flex ">
                        <div className="mr-2 w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mr-3 text-sm font-semibold">
                            <HaircutTools className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-semibold text-sm">Serviço e Horário</h3>
                            <p className="text-xs">{selectedTreatment.name} - {new Date(time).toLocaleString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end space-x-3 ">
                <button
                    className="rounded-lg px-6 py-2 text-xs border text-gray-700 bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                    onClick={() => setOpenReview(false)}
                >
                    Voltar
                </button>

                <button
                    disabled={!selections.time}
                    className={`px-6 py-2 text-xs border text-white  bg-cyan-900 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all ${!selections.time ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                    onClick={handleCreate}
                >
                    Agendar
                </button>
            </div>
        </div>
    );
};

