import {Barbershop} from '../types/barbershop';
import { Barber } from './barber';

export interface DashboardData {
    barbershops: Barbershop[];
    barber: {
        [key: number]: Barber[]; 
    };
}

export interface DashboardContextType {
    dashboardData: DashboardData;
    setDashboardData: (data: DashboardData | ((prev: DashboardData) => DashboardData)) => void;
}