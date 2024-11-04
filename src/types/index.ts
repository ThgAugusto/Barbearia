export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  visits: Visit[];
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description?: string;
}

export interface Visit {
  id: string;
  clientId: string;
  serviceId: string;
  barberId: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Barber {
  id: string;
  name: string;
  avatar?: string;
}