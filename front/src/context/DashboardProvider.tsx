import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DashboardContextType, DashboardData } from '../types/dashboard';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
    children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        barbershops: [],
        barbers: [],
        clients: [],
        treatments: [],
        scheduling: []
    });

    return (
        <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};
