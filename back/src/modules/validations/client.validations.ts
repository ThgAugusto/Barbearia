import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string()
    .min(3, { message: 'O nome do cliente deve ter pelo menos 3 caracteres.' })
    .max(100, { message: 'O nome do cliente deve ter no máximo 100 caracteres.' })
    .refine(value => typeof value === 'string', { message: 'O nome do cliente deve ser um texto.' }),

  phone: z.string()
    .regex(/^\+\d{1,3}[- ]?\d{4,14}$/, { message: 'O telefone deve estar em um formato válido, como +55 11999999999.' })
    .max(15, { message: 'O telefone deve ter no máximo 15 caracteres.' }),

  email: z.string()
    .email({ message: 'O e-mail deve ser um endereço válido.' })
    .max(100, { message: 'O e-mail deve ter no máximo 100 caracteres.' }),

  notes: z.string()
    .max(500, { message: 'As notas devem ter no máximo 500 caracteres.' })
    .optional()
    .refine(value => typeof value === 'string', { message: 'As notas devem ser um texto.' }),

}).strict({ message: 'Somente os campos: name, phone, email, notes são permitidos. Campos extras não são aceitos.' });

export const createClientSchema = clientSchema;

export const updateClientSchema = clientSchema.partial();
