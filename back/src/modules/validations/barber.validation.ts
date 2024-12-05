import { z } from "zod";
import { createUserSchema, updateUserSchema } from "./user.validations";

export const createBarberSchema = z.object({
    user: createUserSchema.extend({
        role: z.literal('BARBER').default('BARBER'),
    }),
    barbershopId: z.number({ required_error: 'O ID da barbearia é obrigatório.' }),
});

export const updateBarberSchema = z.object({
    user: updateUserSchema.extend({
        role: z.literal('BARBER').optional(),
    }).optional(),
    barbershopId: z.number().optional(),
});