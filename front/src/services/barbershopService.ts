import { Barbershop,Create, Update } from "../types/barbershop";
import ConnectionAPI from "./api/connectionAPI";

function BarbershopService() {

    const findAllByOwner = async (): Promise<Barbershop[]> => {
        const response = await ConnectionAPI.get('/owner/barbershops')
        return response.data;
    }

    const create = async (barbershop: Create): Promise<Barbershop> => {
        const response = await ConnectionAPI.post('/barbershops', barbershop)
        return response.data;
    }

    const update = async (id: number, barbershop: Update): Promise<Barbershop> => {
        const response = await ConnectionAPI.patch(`/barbershops/${id}`, barbershop)
        return response.data;
    }

    const softDelete = async (id: number): Promise<Barbershop> => {
        const response = await ConnectionAPI.delete(`/barbershops/${id}`)
        return response.data;
    }

    const restore = async (id: number): Promise<Barbershop> => {
        const response = await ConnectionAPI.patch(`/barbershops/${id}/restore`)
        return response.data;
    }

    return { findAllByOwner, create, update, softDelete, restore };
}

export default BarbershopService;