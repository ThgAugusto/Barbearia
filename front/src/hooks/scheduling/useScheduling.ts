import { useCallback, useEffect, useState } from "react";
import BarberService from "../../services/barberService";
import BarbershopService from "../../services/barbershopService";
import ClientService from "../../services/clientService";
import TreatmentService from "../../services/treatmentService";
import { AxiosError } from "axios";
import { Barbershop } from "../../types/barbershop";
import { Barber } from "../../types/barber";
import { Treatment } from "../../types/treatment";
import { Client } from "../../types/client";
import SchedulingService from "../../services/SchedulingService";
import { Create, Scheduling } from "../../types/scheduling";
import { useDashboard } from "../../context/DashboardProvider";

export interface SchedulingData {
    barbershops: Barbershop[];
    barbers: { [key: number]: Barber[] };
    clients: { [key: number]: Client[] };
    treatments: { [key: number]: Treatment[] };
    availableTimes: { [barbershopId: number]: { [barberId: number]: { [treatmentId: number]: { [date: string]: Date[] } } } };
}

export interface LoadedState {
    barbershops: boolean;
    barbers: { [key: number]: boolean };
    clients: { [key: number]: boolean };
    treatments: { [key: number]: boolean };
    availableTimes: { [barbershopId: number]: { [barberId: number]: { [treatmentId: number]: { [date: string]: boolean[] } } } };
}

export const useSchedulingModal = () => {
    const barberService = BarberService();
    const barbershopService = BarbershopService();
    const clientService = ClientService();
    const treatmentService = TreatmentService();
    const schedulingService = SchedulingService();

    const [schedulingData, setSchedulingData] = useState<SchedulingData>({
        barbershops: [],
        barbers: {},
        clients: {},
        treatments: {},
        availableTimes: {},
    });

    const [isLoaded, setIsLoaded] = useState<LoadedState>({
        barbershops: false,
        barbers: {},
        clients: {},
        treatments: {},
        availableTimes: {},
    });

    const hasData = (key: keyof SchedulingData, barbershopId?: number): boolean => {
        const data = schedulingData[key];
        return barbershopId !== undefined
            ? Array.isArray(data[barbershopId]) && data[barbershopId].length > 0
            : Array.isArray(data) && data.length > 0;
    };

    const fetchData = async <T>(
        fetchFunction: () => Promise<T>,
        stateKey: keyof SchedulingData,
        barbershopId?: number
    ): Promise<void> => {
        try {
            if (!hasData(stateKey, barbershopId) && !(isLoaded[stateKey] as { [key: number]: boolean })[barbershopId ?? 0]) {
                const data = await fetchFunction();
                setSchedulingData((prevData) => ({
                    ...prevData,
                    [stateKey]: barbershopId !== undefined
                        ? { ...prevData[stateKey], [barbershopId]: Array.isArray(data) ? data : [] }
                        : Array.isArray(data) ? data : [],
                }));
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error("Erro ao carregar os dados:", error.message);
            }
        } finally {
            setIsLoaded((prev) => ({
                ...prev,
                [stateKey]: {
                    ...(prev[stateKey] as { [key: number]: boolean }),
                    [barbershopId ?? 0]: true,
                },
            }));
        }
    };

    const loadAvailableTimes = useCallback(
        async (barberId: number, date: Date, treatmentId: number, barbershopId: number) => {
            if (!(date instanceof Date) || isNaN(date.getTime())) {
                return console.error("Data inválida fornecida.");
            }

            const alreadyLoaded = isLoaded.availableTimes[barbershopId]?.[barberId]?.[treatmentId]?.[date.toISOString()];

            if (alreadyLoaded) {
                return console.log("Horários já carregados para esta data.");
            }

            try {
                const availableTimes = await schedulingService.findAvailableTimes(barberId, date, treatmentId);
                setSchedulingData((prevData) => {
                    const newAvailableTimes = { ...prevData.availableTimes };
                    newAvailableTimes[barbershopId] = {
                        ...newAvailableTimes[barbershopId],
                        [barberId]: {
                            ...newAvailableTimes[barbershopId]?.[barberId],
                            [treatmentId]: {
                                ...newAvailableTimes[barbershopId]?.[barberId]?.[treatmentId],
                                [date.toISOString()]: availableTimes || [],
                            },
                        },
                    };
                    return { ...prevData, availableTimes: newAvailableTimes };
                });
            } catch (error) {
                console.error("Erro ao carregar horários disponíveis:", error);
            } finally {
                setIsLoaded((prev) => ({
                    ...prev,
                    availableTimes: {
                        ...prev.availableTimes,
                        [barbershopId]: {
                            ...prev.availableTimes[barbershopId],
                            [barberId]: {
                                ...prev.availableTimes[barbershopId]?.[barberId],
                                [treatmentId]: {
                                    ...prev.availableTimes[barbershopId]?.[barberId]?.[treatmentId],
                                    [date.toISOString()]: [true],
                                },
                            },
                        },
                    },
                }));
            }
        },
        [schedulingData, isLoaded, schedulingService]
    );

    const loadBarbershops = useCallback(() => fetchData(barbershopService.findAllByOwner, "barbershops"), [barbershopService]);
    const loadBarbers = useCallback((barbershopId: number) => fetchData(() => barberService.findAllByBarbershopId(barbershopId), "barbers", barbershopId), [barberService]);
    const loadClients = useCallback((barbershopId: number) => fetchData(() => clientService.findAllByBarbershopId(barbershopId), "clients", barbershopId), [clientService]);
    const loadTreatments = useCallback((barbershopId: number) => fetchData(() => treatmentService.findByBarbershopId(barbershopId), "treatments", barbershopId), [treatmentService]);

    return {
        schedulingData,
        isLoaded,
        loadBarbershops,
        loadBarbers,
        loadClients,
        loadTreatments,
        loadAvailableTimes,
    };
};


export const useSchedulingActions = () => {
    const schedulingService = SchedulingService();
    const { dashboardData, setDashboardData } = useDashboard();
    const barberService = BarberService();
    const barbershopService = BarbershopService();
    const [modalSchedulings, setModalSchedulings] = useState<Scheduling[]>([]);

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [selections, setSelections] = useState({
        barbershop: null as number | null,
        client: null as number | null,
        barber: null as number | null,
        treatment: null as number | null,
        time: null as Date | null,
    });

    const updateSchedulingData = (updatedScheduling: Scheduling) => {
        setDashboardData((prev) => ({
            ...prev,
            scheduling: prev.scheduling.map((item) =>
                item.id === updatedScheduling.id ? updatedScheduling : item
            ),
        }));
    };

    const fetchData = useCallback(async () => {
        if (dashboardData.barbers.length === 0) {
            try {
                const data = await schedulingService.findAllByOwner();
                setDashboardData((prev) => ({
                    ...prev,
                    scheduling: Array.isArray(data) ? data : [],
                }));
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
            }
        }
    }, [dashboardData.scheduling.length, setDashboardData]);

    const fetchDataBarber = useCallback(async () => {
        if (dashboardData.scheduling.length === 0) {
            try {
                const data = await barberService.findAllByOwnerId();
                setDashboardData((prev) => ({
                    ...prev,
                    barbers: Array.isArray(data) ? data : [],
                }));
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
            }
        }
    }, [dashboardData.scheduling.length, setDashboardData]);

    const fetchDataBarbershop = useCallback(async () => {
        if (dashboardData.barbershops.length === 0) {
            try {
                const data = await barbershopService.findAllByOwner();
                setDashboardData(prev => ({
                    ...prev,
                    barbershops: data,
                }));
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
            }
        }
    }, [dashboardData.scheduling.length, setDashboardData]);


    const create = async (scheduling: Create) => {
        try {
            const response = await schedulingService.create(scheduling);
            if (response) {
                setDashboardData((prev) => ({
                    ...prev,
                    scheduling: [...prev.scheduling, response],
                }));
                closeModal();
                resetSelections();
            }
        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
        }
    };

    const softDelete = async (id: number) => {
        try {
            const response = await schedulingService.softDelete(id);
            if (response) {
                setDashboardData((prev) => {
                    const updatedScheduling = prev.scheduling.map((item) => {
                        if (item.id === id) {
                            return { ...item, ...response };
                        }
                        return item;
                    });
                    return {
                        ...prev,
                        scheduling: updatedScheduling,
                    };
                });

                setModalSchedulings((prev) => {
                    const updatedModalSchedulings = prev.map((item) => {
                        if (item.id === id) {
                            return { ...item, ...response };
                        }
                        return item;
                    });
                    return updatedModalSchedulings;
                });
            }
        } catch (error) {
            console.error("Erro ao excluir agendamento:", error);
        }
    };

    const markAsCompleted = async (id: number) => {
        try {
            const response = await schedulingService.markAsCompleted(id);
            if (response) {
                setDashboardData((prev) => {
                    const updatedScheduling = prev.scheduling.map((item) => {
                        if (item.id === id) {
                            return { ...item, ...response };
                        }
                        return item;
                    });
                    return {
                        ...prev,
                        scheduling: updatedScheduling,
                    };
                });

                setModalSchedulings((prev) => {
                    const updatedModalSchedulings = prev.map((item) => {
                        if (item.id === id) {
                            return { ...item, ...response };
                        }
                        return item;
                    });
                    return updatedModalSchedulings;
                });
            }
        } catch (error) {
            console.error("Erro ao restaurar agendamento:", error);
        }
    };

    const resetSelections = () => {
        setCurrentStep(1);
        setSelections({
            barbershop: null,
            client: null,
            barber: null,
            treatment: null,
            time: null,
        });
    };

    useEffect(() => {
        fetchData();
        fetchDataBarber()
        fetchDataBarbershop();
    }, []);

    return {
        create,
        fetchData,
        updateSchedulingData,
        showModal,
        openModal,
        closeModal,
        currentStep,
        setCurrentStep,
        selections,
        setSelections,
        schedulingData: dashboardData.scheduling || [],
        barbersData: dashboardData.barbers.map((barber) => ({ id: barber.id, name: barber.user.name })),
        barbershopsData: dashboardData.barbershops.map((shop) => ({ id: shop.id, name: shop.socialReason })),
        markAsCompleted,
        softDelete,
        modalSchedulings,
        setModalSchedulings
    };
};
