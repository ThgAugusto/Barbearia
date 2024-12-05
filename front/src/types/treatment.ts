import { FormikHelpers } from "formik";

export interface Treatment{
    id: number;
    name: string;
    price: number;
    duration: number;
    description: string | null;
    barbershopId: number;
    status: 'ACTIVE' | 'INACTIVE';

}

export type Create = Omit<Treatment, 'id' | 'status'>;
export type Update = Partial<Omit<Treatment, 'id' | 'status'>>;
export type Data = Omit<Treatment, 'id' | 'status' > & { id?: number };


export interface ContentProps {
    isModalOpen: boolean;
    closeModal: () => void
    barbershopId: number;
}

export type FormProps = {
    values: Data;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    create: (values: Data, formikHelpers: FormikHelpers<Data>) => Promise<void>;
    update: (values: Partial<Data>, formikHelpers: FormikHelpers<Partial<Data>>) => Promise<void>;
};

export type TableProps = {
    treatmentData: Treatment[];
    softDelete: (id: number) => Promise<void>;
    restore: (id: number) => Promise<void>;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    setValues: React.Dispatch<React.SetStateAction<Data>>;
};
