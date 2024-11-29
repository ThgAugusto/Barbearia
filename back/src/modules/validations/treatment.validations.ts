import { z } from 'zod';

export const treatmentSchema = z.object({
  name: z.string()
    .min(3, { message: 'O nome do tratamento deve ter pelo menos 3 caracteres.' })
    .max(255, { message: 'O nome do tratamento deve ter no máximo 255 caracteres.' })
    .refine(value => typeof value === 'string', { message: 'O nome do tratamento deve ser um texto.' }),

  description: z.string()
    .min(10, { message: 'A descrição deve ter pelo menos 10 caracteres.' })
    .max(500, { message: 'A descrição deve ter no máximo 500 caracteres.' })
    .refine(value => typeof value === 'string', { message: 'A descrição deve ser um texto.' })
    .optional(),

  price: z.number()
    .positive({ message: 'O preço deve ser um valor positivo.' })
    .refine(value => value >= 0, { message: 'O preço não pode ser negativo.' }),

  duration: z.number()
    .int({ message: 'A duração deve ser um número inteiro.' })
    .positive({ message: 'A duração deve ser maior que zero.' }),

    barbershopId: z.number()
    .int({ message: 'O identificador de barbearia deve ser um número inteiro válido.' })
    .refine(value => value > 0, { message: 'O identificador de barbearia deve ser um número maior que zero.' }),

}).strict({ message: 'Somente os campos: name, description, price, duration e status são permitidos. Campos extras não são aceitos.' });


export const createTreatmentSchema = treatmentSchema;

export const handleTreatmentUpdate = (schema: any) => {
  return schema
    .omit({ barbershopId: true }) 
    .partial() 
    .refine((data: Partial<z.infer<typeof treatmentSchema>>) => !data.barbershopId, {
      message: 'Não é permitido alterar a barbearia associada a um tratamento. Para isso, crie um novo tratamento.',
      path: ['barbershopId'],
    });
};

export const updateTreatmentSchema = handleTreatmentUpdate(treatmentSchema);