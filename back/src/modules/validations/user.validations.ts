import { z } from 'zod';
import { isValidCPF } from '../../utils/verify.documents';

export const userSchema = z.object({
  name: z.string()
    .min(5, { message: 'O nome deve ter pelo menos 5 caracteres.' })
    .max(100, { message: 'O nome deve ter no máximo 100 caracteres.' }),

  email: z.string().email({ message: 'O e-mail fornecido é inválido (ex: falta @ ou domínio).' }),

  password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
    message: 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.',
  }),

  cpf: z.string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'O CPF deve estar no formato XXX.XXX.XXX-XX.' }) 
    .refine(isValidCPF, { message: 'O CPF fornecido é inválido.' }),

  role: z.enum(['BARBER', 'OWNER'], { message: 'O role deve ser BARBER ou OWNER.' }),

  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
}).strict({
  message: 'Somente os campos: name, email, password, cpf, role e status são permitidos.',
});

export const createUserSchema = userSchema.omit({ status: true });
export const updateUserSchema = userSchema.partial();
