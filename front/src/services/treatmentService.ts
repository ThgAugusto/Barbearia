import { Treatment, Create, Update  } from "../types/treatment";
import ConnectionAPI from "./api/connectionAPI";

function TreatmentService() {

    const findByBarbershopId = async (barbershopId: number): Promise<Treatment[]> => {
        const response = await ConnectionAPI.get(`/treatments/barbershop/${barbershopId}`)
        return response.data;
    }

    const create = async (treatment: Create): Promise<Treatment> => {
        const response = await ConnectionAPI.post('/treatments', treatment)
        return response.data;
    }

    const update = async (id: number, treatment: Update): Promise<Treatment> => {
        const response = await ConnectionAPI.patch(`/treatments/${id}`, treatment)
        return response.data;
    }

    const softDelete = async (id: number): Promise<Treatment> => {
        const response = await ConnectionAPI.delete(`/treatments/${id}`)
        return response.data;
    }

    const restore = async (id: number): Promise<Treatment> => {
        const response = await ConnectionAPI.patch(`/treatments/${id}/restore`)
        return response.data;
    }

    return { findByBarbershopId, create, update, softDelete, restore };
}

export default TreatmentService;