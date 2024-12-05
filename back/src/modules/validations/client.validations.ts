import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string()
    .min(5, { message: 'O nome do cliente deve ter pelo menos 5 caracteres.' })
    .max(100, { message: 'O nome do cliente deve ter no máximo 100 caracteres.' })
    .refine(value => typeof value === 'string', { message: 'O nome do cliente deve ser um texto.' }),

  phone: z.string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, { message: 'O número de telefone fornecido é inválido. O formato esperado é (99) 9999-999 ou (99) 99999-9999.', })
    .refine(value => typeof value === 'string', { message: 'O telefone deve ser um texto.' }),

  email: z.string()
    .email({ message: 'O e-mail deve ser um endereço válido.' })
    .max(100, { message: 'O e-mail deve ter no máximo 100 caracteres.' }),

  notes: z.string()
    .max(500, { message: 'As notas devem ter no máximo 500 caracteres.' })
    .optional()
    .refine(value => typeof value === 'string', { message: 'As notas devem ser um texto.' }),

  barbershopId: z.number().int().positive('O identificador de barbearia deve ser um número maior que zero.')

}).strict({ message: 'Somente os campos: name, phone, email, notes são permitidos. Campos extras não são aceitos.' });

export const createClientSchema = clientSchema;

export const updateClientSchema = clientSchema.partial();
