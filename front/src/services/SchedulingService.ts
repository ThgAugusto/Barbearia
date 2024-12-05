import { Create, Scheduling } from "../types/scheduling";
import ConnectionAPI from "./api/connectionAPI";

function SchedulingService() {


    const findAllByOwner = async (): Promise<Scheduling[]> => {
        const response = await ConnectionAPI.get('/owner/scheduling')
        return response.data;
    }


    const findAvailableTimes = async (barberId: number, date: Date, treatmentId: number): Promise<Date[]> => {
        const response = await ConnectionAPI.get('/scheduling/available-times', {
            params: { barberId, date, treatmentId },
        });
        return response.data;
    };

    const create = async (scheduling: Create): Promise<Scheduling> => {
        const response = await ConnectionAPI.post('/scheduling', scheduling);
        return response.data;
    };

    const softDelete = async (id: number): Promise<Scheduling> => {
        const response = await ConnectionAPI.delete(`/scheduling/${id}`);
        return response.data;
    };

    const markAsCompleted = async (id: number): Promise<Scheduling> => {
        const response = await ConnectionAPI.patch(`/scheduling/${id}/complete`);
        return response.data;
    };

    return { findAvailableTimes, findAllByOwner, create, softDelete, markAsCompleted }; 
}

export default SchedulingService;