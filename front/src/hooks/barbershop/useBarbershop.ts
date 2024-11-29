import { useEffect, useCallback, useState } from "react";
import BarbershopService from "../../services/barbershop/barbershopService";
import { FormikHelpers } from "formik";
import { useDashboard } from "../../context/DashboardProvider";
import { Data } from "../../types/barbershop";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";

const useBarbershops = () => {
    const { dashboardData, setDashboardData } = useDashboard();
    const barbershopService = BarbershopService();
    const [searchParams, setSearchParams] = useSearchParams();
    const [barbershopId, setBarbershopId] = useState<number | null>(null);
    const [openModalBarber, setOpenModalBarber] = useState(false);

    const fetchData = useCallback(async () => {
        if (dashboardData.barbershops.length === 0) {
            const data = await barbershopService.findAllByOwner();
            setDashboardData((prev) => ({
                ...prev,
                barbershops: data,
            }));
        }
    }, [dashboardData.barbershops, setDashboardData, barbershopService]);


    const create = async (barbershop: Data, formikHelpers: FormikHelpers<Data>) => {
        const { setErrors } = formikHelpers;
        try {
            const response = await barbershopService.create(barbershop);
            if (response) {
                setDashboardData((prev) => ({
                    ...prev,
                    barbershops: [...prev.barbershops, response],
                }));
            }
        } catch (error) {
            handleError(error, setErrors);
        }
    };


    const update = async (barbershop: Partial<Data>, formikHelpers: FormikHelpers<Partial<Data>>) => {
        const { setErrors } = formikHelpers;
        try {
            if (!barbershop.id) {
                throw new Error("Barber ID is required for updating");
            }
            const { id, ...barberDataWithoutId } = barbershop;
            const response = await barbershopService.update(id, barberDataWithoutId);
            if (response) {
                setDashboardData((prev) => ({
                    ...prev,
                    barbershops: prev.barbershops.map((item) =>
                        item.id === barbershop.id ? response : item
                    ),
                }));
            }
        } catch (error) {
            handleError(error, setErrors);
        }
    };


    const softDelete = async (id: number) => {
        const response = await barbershopService.softDelete(id);
        if (response) {
            setDashboardData((prev) => ({
                ...prev,
                barbershops: prev.barbershops.map((shop) =>
                    shop.id === id ? { ...shop, ...response } : shop 
                ),
            }));
        }
    };

    const restore = async (id: number) => {
        const response = await barbershopService.restore(id);
        if (response) {
            setDashboardData((prev) => ({
                ...prev,
                barbershops: prev.barbershops.map((shop) =>
                    shop.id === id ? { ...shop, ...response } : shop 
                ),
            }));
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


    const handleOpenBarberModal = (shopId: number) => {
        searchParams.set("barbershopId", String(shopId));
        setSearchParams(searchParams, { replace: true });
    };

    const handleCloseBarberModal = () => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.delete('barbershopId');
            return newParams;
        });
    };

    useEffect(() => {
        const paramBarbershopId = searchParams.get("barbershopId");
        if (paramBarbershopId && !isNaN(Number(paramBarbershopId))) {
            setBarbershopId(Number(paramBarbershopId));
            setOpenModalBarber(true)
        } else {
            setBarbershopId(null);
            setOpenModalBarber(false)
        }
    }, [searchParams]);

    return {
        barbershopData: dashboardData.barbershops,
        update,
        create,
        softDelete,
        barbershopId,
        handleCloseBarberModal,
        handleOpenBarberModal,
        openModalBarber,
        restore
    };
};

export default useBarbershops;
