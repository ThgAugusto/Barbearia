import { FormikHelpers } from "formik";
import React from "react";
import { Barbershop } from "./barbershop";
import { User, Create as CreateUser } from "./user";

export interface Barber {
    id: number;
    barbershopId: number;
    userId: number;
    user: User;
    barbershop: Barbershop
}

export type Create = & { user: CreateUser } & { barbershopId: number };
export type Data = CreateUser & { id?: number, barbershopId?: number }
export type Update = { user?: Partial<CreateUser> } & { barbershopId?: number };;


export type FormProps = {
    values: Data;
    create: (values: Data, formikHelpers: FormikHelpers<Data>) => Promise<void>;
    update: (values: Partial<Data>, formikHelpers: FormikHelpers<Partial<Data>>) => Promise<void>;
    barbershopsData: {
        id: number;
        socialReason: string;
    }[];
};

export type ModalProps = FormProps & {
    isModalOpen: boolean;
    closeModal: () => void;
};

export type TableProps = {
    barbersData: Barber[];
    setValues: React.Dispatch<React.SetStateAction<Data>>;
    openModal: () => void;
    softDelete: (id: number) => Promise<void>;
    restore: (id: number) => Promise<void>;
};

export interface BarberContentProps {
    openModalBarber: boolean;
    handleCloseBarberModal: () => void;
    barbershopId: number;
}
