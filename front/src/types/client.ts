import { FormikHelpers } from "formik";
import { Barbershop } from "./barbershop";

export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  notes: string | null;
  barbershopId: number;
  status: 'ACTIVE' | 'INACTIVE';
  barbershop: Barbershop; 
}

export type Create = Omit<Client, 'id' | 'status' | 'barbershop'>;
export type Update = Partial<Omit<Client, 'id' | 'status' | 'barbershop'>>;
export type Data = Omit<Client, 'id' | 'status' | 'barbershop' > & { id?: number };


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
  clientsData: Client[];
  setValues: React.Dispatch<React.SetStateAction<Data>>;
  openModal: () => void;
  softDelete: (id: number) => Promise<void>;
  restore: (id: number) => Promise<void>;
};