import { z } from 'zod';

export const barbershopSchema = z.object({
    socialReason: z.string()
        .min(5, { message: 'A razão social deve ter pelo menos 5 caracteres.' })
        .max(255, { message: 'A razão social deve ter no máximo 255 caracteres.' })
        .refine(value => typeof value === 'string', { message: 'A razão social deve ser um texto.' }),

    tradeName: z.string()
        .max(255, { message: 'O nome fantasia deve ter no máximo 255 caracteres.' })
        .optional()
        .refine(value => value === undefined || typeof value === 'string', { message: 'O nome fantasia deve ser um texto ou indefinido.' }),

    cnpj: z.string()
        .length(18, { message: 'O CNPJ deve ter 18 caracteres no formato XX.XXX.XXX/XXXX-XX.' })
        .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, { message: 'O CNPJ fornecido é inválido. O formato esperado é XX.XXX.XXX/XXXX-XX.' })
        .refine(value => typeof value === 'string', { message: 'O CNPJ deve ser um texto.' }),

    address: z.string()
        .min(5, { message: 'O endereço deve ter pelo menos 5 caracteres.' })
        .max(255, { message: 'O endereço deve ter no máximo 255 caracteres.' })
        .refine(value => typeof value === 'string', { message: 'O endereço deve ser um texto.' }),

    phoneNumber: z.string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/,{message: 'O número de telefone fornecido é inválido. O formato esperado é (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.',})
        .refine(value => typeof value === 'string', { message: 'O telefone deve ser um texto.' }),

}).strict({  message: 'Somente os campos: socialReason, tradeName, cnpj, address, phoneNumber e ownerId são permitidos. Campos extras não são aceitos.'});

export const createBarbershopSchema = barbershopSchema;
export const updateBarbershopSchema = barbershopSchema.partial();
