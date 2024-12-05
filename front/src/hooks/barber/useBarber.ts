import { useCallback, useEffect } from "react";
import { FormikHelpers } from "formik";
import { useDashboard } from "../../context/DashboardProvider";
import BarberService from "../../services/barberService";
import { AxiosError } from "axios";
import { Barber, Data } from "../../types/barber";
import useBarbershops from "../barbershop/useBarbershop";
import { useSetModalInUrl } from "../modal/useModelInUrl";

const useBarber = () => {
    const { dashboardData, setDashboardData } = useDashboard();
    const barberService = BarberService();
    const { barbershopsData } = useBarbershops();
    const {isModalOpen, openModal, closeModal} =useSetModalInUrl('Barber');

    const updateBarbersData = (updatedBarber: Barber) => {
        setDashboardData((prev) => ({
            ...prev,
            barbers: prev.barbers.map((item) =>
                item.id === updatedBarber.id ? updatedBarber : item
            ),
        }));
    };

    const fetchData = useCallback(async () => {
        if (dashboardData.barbers.length === 0) {
            try {
                const data = await barberService.findAllByOwnerId();
                setDashboardData((prev) => ({
                    ...prev,
                    barbers: Array.isArray(data) ? data : [],
                }));
            } catch (error) {
                console.error("Error fetching barbers:", error);
            }
        }
    }, [dashboardData.barbers.length, setDashboardData, barberService]);

    const create = async (barber: Data, formikHelpers: FormikHelpers<Data>) => {
        try {
            const response = await barberService.create({
                user: {
                    name: barber.name,
                    email: barber.email,
                    password: barber.password,
                    cpf: barber.cpf,
                },
                barbershopId: Number(barber.barbershopId),
            });
            if (response) {
                setDashboardData((prev) => ({
                    ...prev,
                    barbers: [...prev.barbers, response],
                }));
                closeModal()
            }
        } catch (error) {
            handleError(error, formikHelpers.setErrors);
        }
    };

    const update = async (barber: Partial<Data>, formikHelpers: FormikHelpers<Partial<Data>>) => {
        console.log(barber)
        try {
            if (!barber.id) {
                throw new Error("Barber ID is required for updating");
            }
            const response = await barberService.update(barber.id, {
                user: {
                    name: barber.name,
                    email: barber.email,
                    cpf: barber.cpf,
                    password: barber.password
                },
                ...(barber.barbershopId && { barbershopId: Number(barber.barbershopId) })
            });

            if (response) {
                updateBarbersData(response);
                closeModal()
            }
        } catch (error) {
            handleError(error, formikHelpers.setErrors);
        }
    };

    const softDelete = async (id: number) => {
        try {
            const response = await barberService.softDelete(id);
            updateBarbersData(response);
        } catch (error) {
            console.error("Error during soft delete:", error);
        }
    };

    const restore = async (id: number) => {
        try {
            const response = await barberService.restore(id);
            updateBarbersData(response);
        } catch (error) {
            console.error("Error during restore:", error);
        }
    };

    const handleError = (error: unknown, setErrors: FormikHelpers<Data>["setErrors"]) => {
        if (error instanceof AxiosError) {
            setErrors(error.response?.data?.message);
        } else {
            console.error("Unexpected error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        barbersData: dashboardData.barbers || [],
        barbershopsData: barbershopsData.map(({ id, socialReason }) => ({ id, socialReason })),
        create,
        update,
        softDelete,
        restore,
        openModal, closeModal, isModalOpen
    };
};

export default useBarber;
