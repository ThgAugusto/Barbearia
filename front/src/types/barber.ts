import { FormikHelpers } from "formik";
import React from "react";

export interface Barber {
    id: number;
    name: string;
    email: string;
    password: string;
    barbershopId: number;
    status: "ACTIVE" | 'INACTIVE';
}

export type Create = Omit<Barber, 'id' | 'status'>;
export type Update = Partial<Omit<Barber, 'id' | 'status'>>;
export type Data = Omit<Barber, 'id' | 'status'> & { id?: number };

export interface BarberContentProps {
    openModalBarber: boolean;
    handleCloseBarberModal: () => void;
    barbershopId: number;
}

export type FormProps = {
    values: Data;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    create: (values: Data, formikHelpers: FormikHelpers<Data>) => Promise<void>;
    update: (values: Partial<Data>, formikHelpers: FormikHelpers<Partial<Data>>) => Promise<void>;
};

export type TableProps = {
    barberData: Omit<Barber[], 'password'>;
    setValues: React.Dispatch<React.SetStateAction<Data>>;
    softDelete: (id: number) => Promise<void>;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    restore: (id: number) => Promise<void>;
};