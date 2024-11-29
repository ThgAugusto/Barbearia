import { Barber, Create, Update  } from "../../types/barber";
import ConnectionAPI from "../api/connectionAPI";

function BarberService() {

    const findAllBarbersByBarbershopId = async (barbershopId: number): Promise<Barber[]> => {
        console.log(barbershopId, typeof barbershopId);
        const response = await ConnectionAPI.get(`/user/barbers/barbershop/${barbershopId}`)
        return response.data;
    }

    const create = async (barber: Create): Promise<Barber> => {
        const response = await ConnectionAPI.post('/users/barber', barber)
        return response.data;
    }

    const update = async (id: number, barbershop: Update): Promise<Barber> => {
        const response = await ConnectionAPI.patch(`/users/${id}`, barbershop)
        return response.data;
    }

    const softDelete = async (id: number): Promise<Barber> => {
        const response = await ConnectionAPI.delete(`/users/${id}`)
        return response.data;
    }

    const restore = async (id: number): Promise<Barber> => {
        const response = await ConnectionAPI.patch(`/users/${id}/restore`)
        return response.data;
    }

    return { findAllBarbersByBarbershopId, create, update, softDelete, restore };
}

export default BarberService;