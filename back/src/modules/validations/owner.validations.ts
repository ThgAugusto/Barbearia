import { z } from "zod";
import { createUserSchema, updateUserSchema } from "./user.validations";

export const createOwnerSchema = z.object({
  user: createUserSchema.extend({
    role: z.literal('OWNER').default('OWNER'),
  }),
  phoneNumber: z.string()
    .min(10, { message: 'O número de telefone deve ter pelo menos 10 caracteres.' })
    .max(15, { message: 'O número de telefone deve ter no máximo 15 caracteres.' })
    .refine((val) => /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(val), {
      message: 'O número de telefone deve estar no formato (XX) XXXX-XXXX.',
    }),
});

export const updateOwnerSchema = z.object({
  user: updateUserSchema.extend({
    role: z.literal('OWNER').optional(),
  }).optional(),
  phoneNumber: z.string()
    .min(10, { message: 'O número de telefone deve ter pelo menos 10 caracteres.' })
    .max(15, { message: 'O número de telefone deve ter no máximo 15 caracteres.' })
    .refine((val) => /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(val), {
      message: 'O número de telefone deve estar no formato (XX) XXXX-XXXX.',
    })
    .optional(),
});
