import { Barber, Create, Update } from "../types/barber";

import ConnectionAPI from "./api/connectionAPI";

function BarberService() {

    const findAllByOwnerId = async (): Promise<Barber[]> => {
        const response = await ConnectionAPI.get(`/barbers/owner`);
        return response.data;
    };

    const findAllByBarbershopId = async (barbershopId: number): Promise<Barber> => {
        const response = await ConnectionAPI.get(`/barbers/barbershop/${barbershopId}`);
        return response.data;
    };

    const create = async (barber: Create): Promise<Barber> => {
        const response = await ConnectionAPI.post('/barbers', barber);
        return response.data;
    };

    const update = async (id: number, barber: Update): Promise<Barber> => {
        const response = await ConnectionAPI.patch(`/barbers/${id}`, barber);
        return response.data;
    };

    const softDelete = async (id: number): Promise<Barber> => {
        const response = await ConnectionAPI.delete(`/barbers/${id}`);
        return response.data;
    };

    const restore = async (id: number): Promise<Barber> => {
        const response = await ConnectionAPI.patch(`/barbers/${id}/restore`);
        return response.data;
    };

    return { findAllByOwnerId, findAllByBarbershopId, create, update, softDelete, restore };
}

export default BarberService;
