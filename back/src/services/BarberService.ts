import { BarberModel } from '../models/BarberModel';
import { Barber } from '../interfaces/Barber';
import argon2 from 'argon2';

export class BarberService {
  static async createBarber(data: Barber) {
    const existingBarber = await BarberModel.findByEmail(data.email);
    if (existingBarber) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await argon2.hash(data.password);

    const newBarber = {
      ...data,
      password: hashedPassword
    };

    return await BarberModel.create(newBarber);
  }
}

