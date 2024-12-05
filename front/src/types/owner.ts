import { User, Create as CreateUser } from "./user";

export interface Owner {
  id: number;
  userId: number;
  phoneNumber: string;
  user: User
}

export type Create = & { user: CreateUser } & Omit<Owner, 'id' | 'userId' | 'user'>;

export type DataStepOne = {
  name: string;
  email: string;
  phoneNumber: string;
}

export type DataStepTwo = {
  cpf: string;
  password: string;
  confirmPassword: string;
}
