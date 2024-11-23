import { z } from 'zod';

export const userSchema = z.object({
  name: z.string()
    .min(5, { message: 'O nome deve ter pelo menos 5 caracteres.' })
    .max(100, { message: 'O nome deve ter no máximo 100 caracteres.' })
    .refine(value => typeof value === 'string', { message: 'O nome deve ser um texto.' }),

  email: z.string()
    .email({ message: 'O e-mail fornecido é inválido.' })
    .min(1, { message: 'O e-mail não pode estar vazio.' }) 
    .refine(value => typeof value === 'string', { message: 'O e-mail deve ser um texto.' }),

  password: z.string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
    .regex(/[A-Z]/, { message: 'A senha deve conter pelo menos uma letra maiúscula.' })
    .regex(/\d/, { message: 'A senha deve conter pelo menos um número.' })
    .regex(/[@$!%*?&]/, { message: 'A senha deve conter pelo menos um caractere especial.' })
    .refine(value => typeof value === 'string', { message: 'A senha deve ser um texto.' }),

  role: z.enum(['BARBER', 'OWNER'], { message: 'O papel fornecido é inválido.' })
    .refine(value => typeof value === 'string', { message: 'O papel deve ser um texto.' }),

  barbershopId: z.number().int().nullable().optional()
    .refine(value => value === null || typeof value === 'number', { message: 'O barbershopId deve ser um número ou nulo.' }),
});

export const createUserSchema = userSchema;

export const updateUserSchema = userSchema.partial();

