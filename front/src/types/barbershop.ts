import { FormikHelpers } from "formik";

export interface Barbershop {
    id: number;
    socialReason: string;
    tradeName: string;
    cnpj: string;
    address: string;
    phoneNumber: string;
    status: "ACTIVE" | 'INACTIVE';
}

export type Create = Omit<Barbershop, 'id' | 'status'>;
export type Update = Partial<Omit<Barbershop, 'id' | 'status'>>;
export type Data = Omit<Barbershop, 'id' | 'status'> & { id?: number };


export type FormProps = {
    values: Data;
    create: (values: Data, formikHelpers: FormikHelpers<Data>) => Promise<void>;
    update: (values: Partial<Data>, formikHelpers: FormikHelpers<Partial<Data>>) => Promise<void>;
};

export type ModalProps = FormProps & {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TableProps = {
    barbershopData: Barbershop[];
    setValues: React.Dispatch<React.SetStateAction<Data>>;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    softDelete: (id: number) => Promise<void>;
    handleOpenBarberModal: (shopId: number) => void;
    restore: (id: number) => Promise<void>;
};