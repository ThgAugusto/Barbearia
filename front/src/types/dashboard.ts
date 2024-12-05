import { Barbershop } from '../types/barbershop';
import { Barber } from './barber';
import { Client } from './client';
import { Scheduling } from './scheduling';
import { Treatment } from './treatment';

export interface DashboardData {
    barbershops: Barbershop[];
    barbers: Barber[];
    clients: Client[];
    treatments: {[key: number]: Treatment[];};
    scheduling: Scheduling[];

}

export interface DashboardContextType {
    dashboardData: DashboardData;
    setDashboardData: (data: DashboardData | ((prev: DashboardData) => DashboardData)) => void;
}