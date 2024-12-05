import { Client, Create, Update } from "../types/client";
import ConnectionAPI from "./api/connectionAPI";

function ClientService() {

    const findAllByOwnerId = async (): Promise<Client[]> => {
        const response = await ConnectionAPI.get(`/clients/owner`);
        return response.data;
    };

    const findAllByBarbershopId = async (barbershopId: number): Promise<Client[]> => {
        const response = await ConnectionAPI.get(`/clients/barbershop/${barbershopId}`);
        return response.data;
    };

    const create = async (client: Create): Promise<Client> => {
        const response = await ConnectionAPI.post('/clients', client);
        return response.data;
    };


    const update = async (id: number, client: Update): Promise<Client> => {
        const response = await ConnectionAPI.patch(`/clients/${id}`, client);
        return response.data;
    };

    const softDelete = async (id: number): Promise<Client> => {
        const response = await ConnectionAPI.delete(`/clients/${id}`);
        return response.data;
    };

    const restore = async (id: number): Promise<Client> => {
        const response = await ConnectionAPI.patch(`/clients/${id}/restore`);
        return response.data;
    };

    return { findAllByOwnerId, findAllByBarbershopId,create, update, softDelete, restore };
}

export default ClientService;
