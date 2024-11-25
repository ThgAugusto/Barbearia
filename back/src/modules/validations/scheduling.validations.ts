import { z } from 'zod';
import { SchedulingStatus } from '@prisma/client';

export const schedulingSchema = z.object({
  dateTime: z.date({
    errorMap: () => ({ message: 'A data e hora do agendamento deve ser válida.' }),
  })
    .refine(value => value > new Date(), { message: 'O agendamento deve ser para uma data futura.' }),

  notes: z.string()
    .max(500, { message: 'As observações devem ter no máximo 500 caracteres.' })
    .optional(),

  barberId: z.number()
    .int({ message: 'O identificador do barbeiro deve ser um número inteiro válido.' })
    .refine(value => value > 0, { message: 'O identificador do barbeiro deve ser maior que zero.' }),

  barbershopId: z.number()
    .int({ message: 'O identificador da barbearia deve ser um número inteiro válido.' })
    .refine(value => value > 0, { message: 'O identificador da barbearia deve ser maior que zero.' }),

  status: z.nativeEnum(SchedulingStatus, { message: 'Status inválido.' })
    .optional()
    .default(SchedulingStatus.SCHEDULED),  

  treatmentId: z.number()
    .int({ message: 'O identificador do tratamento deve ser um número inteiro válido.' })
    .refine(value => value > 0, { message: 'O identificador do tratamento deve ser maior que zero.' }),

  clientId: z.number()
    .int({ message: 'O identificador do cliente deve ser um número inteiro válido.' })
    .refine(value => value > 0, { message: 'O identificador do cliente deve ser maior que zero.' }),
}).strict({
  message: 'Somente os campos: dateTime, notes, barberId, barbershopId, status, treatmentId e clientId são permitidos. Campos extras não são aceitos.',
});

export const createSchedulingSchema = schedulingSchema;

export const updateSchedulingSchema = schedulingSchema.partial();
