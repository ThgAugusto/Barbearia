import { useEffect, useCallback } from "react";
import BarberService from "../../services/barber/barberService";
import { useDashboard } from "../../context/DashboardProvider";
import { AxiosError } from "axios";
import { FormikHelpers } from "formik";
import { Data } from "../../types/barber";

const useBarber = (barbershopId: number) => {
    const { dashboardData, setDashboardData } = useDashboard();
    const barberService = BarberService();

    const fetchData = useCallback(async () => {
        if (!dashboardData.barber[barbershopId]) {
            const data = await barberService.findAllBarbersByBarbershopId(barbershopId);
            setDashboardData((prev) => ({
                ...prev,
                barber: {
                    ...prev.barber,
                    [barbershopId]: data,
                },
            }));
        }
    }, [dashboardData, setDashboardData, barberService, barbershopId]);

    const create = async (barber: Data, formikHelpers: FormikHelpers<Data>) => {
        const { setErrors } = formikHelpers;
        try {
            const response = await barberService.create(barber);
            if (response) {
                setDashboardData((prev) => ({
                    ...prev,
                    barber: {
                        ...prev.barber,
                        [barbershopId]: [...(prev.barber[barbershopId] || []), response],
                    },
                }));
            }
        } catch (error) {
            handleError(error, setErrors);
        }
    };

    const update = async (barber: Partial<Data>, formikHelpers: FormikHelpers<Partial<Data>>) => {
        const { setErrors } = formikHelpers;
        try {
            if (!barber.id) {
                throw new Error("Barber ID is required for updating");
            }
            
            const { id, ...barberDataWithoutId } = barber;
            const response = await barberService.update(id, barberDataWithoutId);
    
            if (response) {
                setDashboardData((prev) => ({
                    ...prev,
                    barber: {
                        ...prev.barber,
                        [response.barbershopId]: prev.barber[response.barbershopId].map((item) =>
                            item.id === barber.id ? response : item
                        ),
                    },
                }));
            }
        } catch (error) {
            handleError(error, setErrors);
        }
    };
    
    const softDelete = async (id: number) => {
        const response = await barberService.softDelete(id);
        setDashboardData((prev) => ({
            ...prev,
            barber: {
                ...prev.barber,
                [response.barbershopId]: prev.barber[response.barbershopId].map((item) =>
                    item.id === id ? response : item
                ),
            },
        }));
    };

    const restore = async (id: number) => {
        const response = await barberService.restore(id);
        setDashboardData((prev) => ({
            ...prev,
            barber: {
                ...prev.barber,
                [response.barbershopId]: prev.barber[response.barbershopId].map((item) =>
                    item.id === id ? response : item
                ),
            },
        }));
    };


    const handleError = (error: unknown, setErrors: FormikHelpers<Data>['setErrors']) => {
        if (error instanceof AxiosError) {
            setErrors(error.response?.data?.message);
        } else {
            console.error('Erro inesperado:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [barbershopId]);

    return {
        barberData: dashboardData.barber[barbershopId] || [],
        create,
        update,
        softDelete,
        restore
    };
};

export default useBarber;
