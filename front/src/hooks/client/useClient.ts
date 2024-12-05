import { useCallback, useEffect } from "react";
import { FormikHelpers } from "formik";
import { useDashboard } from "../../context/DashboardProvider";
import ClientService from "../../services/clientService";
import { AxiosError } from "axios";
import { Data } from "../../types/client";
import useBarbershops from "../barbershop/useBarbershop";
import { useSetModalInUrl } from "../modal/useModelInUrl";

const useClient = () => {
    const { dashboardData, setDashboardData } = useDashboard();
    const clientService = ClientService();
    const { barbershopsData } = useBarbershops();
    const {isModalOpen, openModal, closeModal} =useSetModalInUrl('Client');

    const fetchData = useCallback(async () => {
        if (dashboardData.clients.length === 0) {
            const data = await clientService.findAllByOwnerId();
            setDashboardData((prev) => ({
                ...prev,
                clients: data,
            }));
        }
    }, [dashboardData.clients, setDashboardData, clientService]);

    const create = async (client: Data, formikHelpers: FormikHelpers<Data>) => {
        try {
            const clientData = {
                ...client,
                barbershopId: Number(client.barbershopId),
            };

            const response = await clientService.create(clientData);

            if (response) {
                setDashboardData((prev) => ({
                    ...prev,
                    clients: [...prev.clients, response],
                }));
                closeModal();
            }
        } catch (error) {
            handleError(error, formikHelpers.setErrors);
        }
    };

    const update = async (client: Partial<Data>, formikHelpers: FormikHelpers<Partial<Data>>) => {
        try {
            if (!client.id) {
                throw new Error("Client ID is required for updating");
            }

            const { id, ...clientDataWithoutId } = client;

            const updatedClientData = {
                ...clientDataWithoutId,
                ...(clientDataWithoutId.barbershopId && {
                    barbershopId: Number(clientDataWithoutId.barbershopId), 
                }),
            };

            const response = await clientService.update(id, updatedClientData);

            if (response) {
                setDashboardData((prev) => ({
                    ...prev,
                    clients: prev.clients.map((item) =>
                        item.id === client.id ? response : item
                    ),
                }));
                closeModal()
            }
        } catch (error) {
            handleError(error, formikHelpers.setErrors);
        }
    };

    const softDelete = async (id: number) => {
        try {
            const response = await clientService.softDelete(id);
            setDashboardData((prev) => ({
                ...prev,
                clients: prev.clients.map((item) =>
                    item.id === id ? response : item
                ),
            }));
        } catch (error) {
            console.error("Error during soft delete:", error);
        }
    };

    const restore = async (id: number) => {
        try {
            const response = await clientService.restore(id);
            setDashboardData((prev) => ({
                ...prev,
                clients: prev.clients.map((item) =>
                    item.id === id ? response : item
                ),
            }));
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
        clientsData: dashboardData.clients || [],
        barbershopsData: barbershopsData.map(({ id, socialReason }) => ({ id, socialReason })),
        create,
        update,
        softDelete,
        restore,
        openModal, closeModal, isModalOpen
    };
};

export default useClient;
