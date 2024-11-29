import { z } from 'zod';

export const userSchema = z.object({
  name: z.string()
    .min(5, { message: 'O nome deve ter pelo menos 5 caracteres.' })
    .max(100, { message: 'O nome deve ter no máximo 100 caracteres.' }),

  email: z.string().email({ message: 'O e-mail fornecido é inválido (ex: falta @ ou domínio.)' }),

  password: z.string().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
    message: 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.',
  }),

  role: z.enum(['BARBER', 'OWNER']).optional(),

  barbershopId: z.number().int().nullable().optional()
    .refine(value => (value === null || value === undefined) || value > 0, { message: 'O indentificador de barbearia deve ser um número maior que zero.' }),
}).strict({
  message: 'Somente os campos: name, cnpj, email, password, barbershopId e role são permitidos. Campos extras não são aceitos.'
});

const roleValidation = (data: Partial<z.infer<typeof userSchema>>, ctx: any) => {
  if (data.role === 'OWNER' && data.barbershopId !== null) {
    ctx.addIssue({
      path: ['barbershopId'],
      message: 'Proprietário não pode associar uma barbearia à sua conta.',
      code: z.ZodIssueCode.custom,
    });
  } else if (data.role === 'BARBER' && data.barbershopId === null) {
    ctx.addIssue({
      path: ['barbershopId'],
      message: 'Barbeiro precisa estar associado a uma barbearia.',
      code: z.ZodIssueCode.custom,
    });
  }
};

export const createUserSchema = userSchema.superRefine(roleValidation); 

export const updateUserSchema = userSchema.partial().superRefine(roleValidation); 