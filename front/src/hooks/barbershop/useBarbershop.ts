import { useEffect, useCallback } from "react";
import BarbershopService from "../../services/barbershopService";
import { FormikHelpers } from "formik";
import { useDashboard } from "../../context/DashboardProvider";
import { Barbershop, Data } from "../../types/barbershop";
import { AxiosError } from "axios";
import { useSetModalInUrl } from "../modal/useModelInUrl";

const useBarbershop = () => {
    const { dashboardData, setDashboardData } = useDashboard();
    const barbershopService = BarbershopService();
    const {isModalOpen, openModal, closeModal} =useSetModalInUrl('Barbershop');

    const updateBarbershopState = useCallback((newData: Barbershop[]) => {
        setDashboardData(prev => ({
            ...prev,
            barbershops: newData,
        }));
    }, [setDashboardData]);

    const fetchData = useCallback(async () => {
        if (!dashboardData.barbershops.length) {
            try {
                const data = await barbershopService.findAllByOwner();
                updateBarbershopState(data);
            } catch (error) {
                console.error("Erro ao buscar barbearias:", error);
            }
        }
    }, [dashboardData.barbershops.length, barbershopService, updateBarbershopState]);

    
    const create = async (barbershop: Data, formikHelpers: FormikHelpers<Data>) => {
        try {
            const response = await barbershopService.create(barbershop);
            if (response) {
                updateBarbershopState([...dashboardData.barbershops, response]);
                closeModal()
            }
        } catch (error) {
            handleError(error, formikHelpers.setErrors);
        }
    };

    const update = async (barbershop: Partial<Data>, formikHelpers: FormikHelpers<Partial<Data>>) => {
        try {
            if (!barbershop.id) {
                throw new Error("ID da barbearia é obrigatório para atualização.");
            }
            const { id, ...barberDataWithoutId } = barbershop;
            const response = await barbershopService.update(id, barberDataWithoutId);
            if (response) {
                updateBarbershopState(
                    dashboardData.barbershops.map(item =>
                        item.id === barbershop.id ? response : item
                    )
                );
                closeModal()
            }
        } catch (error) {
            handleError(error, formikHelpers.setErrors);
        }
    };

    const softDelete = async (id: number) => {
        try {
            const response = await barbershopService.softDelete(id);
            if (response) {
                updateBarbershopState(
                    dashboardData.barbershops.map(shop =>
                        shop.id === id ? { ...shop, ...response } : shop
                    )
                );
            }
        } catch (error) {
            console.error("Erro ao excluir barbearia:", error);
        }
    };

    const restore = async (id: number) => {
        try {
            const response = await barbershopService.restore(id);
            if (response) {
                updateBarbershopState(
                    dashboardData.barbershops.map(shop =>
                        shop.id === id ? { ...shop, ...response } : shop
                    )
                );
            }
        } catch (error) {
            console.error("Erro ao restaurar barbearia:", error);
        }
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
    }, []);

    return {
        barbershopsData: dashboardData.barbershops || [],
        update, create, softDelete, restore,
        isModalOpen, openModal, closeModal
    };
};

export default useBarbershop;


