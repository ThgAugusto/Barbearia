import { Barber } from "./barber";
import { Barbershop } from "./barbershop";
import { Client } from "./client";
import { Treatment } from "./treatment";

export interface Scheduling {
    id: number;
    startTime: Date;
    endTime: Date;        
    notes?:  string;
    barberId:    number;
    barbershopId: number;
    treatmentId: number;
    clientId: number;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

    barber: Barber; 
    client: Client; 
    barbershop: Barbershop; 
    treatment: Treatment; 
}

export type Create = Omit<Scheduling, 'id' | 'status' | 'barber' | 'client' | 'barbershop' | 'treatment'>
