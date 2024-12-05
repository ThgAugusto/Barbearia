import * as yup from 'yup';

export const treatmentSchema = yup.object({
  name: yup
    .string()
    .required('O nome do tratamento é obrigatório.')
    .min(3, 'O nome do tratamento deve ter pelo menos 3 caracteres.')
    .max(255, 'O nome do tratamento deve ter no máximo 255 caracteres.'),

  description: yup
    .string()
    .optional()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres.')
    .max(500, 'A descrição deve ter no máximo 500 caracteres.'),

  price: yup
    .number()
    .required('O preço é obrigatório.')
    .positive('O preço deve ser um valor positivo.')
    .min(0, 'O preço não pode ser negativo.'),

  duration: yup
    .number()
    .required('A duração é obrigatória.')
    .integer('A duração deve ser um número inteiro.')
    .positive('A duração deve ser maior que zero.'),

 
}).noUnknown(true, 'Somente os campos: name, description, price, duration são permitidos. Campos extras não são aceitos.');

export const createTreatmentSchema = treatmentSchema;



export const updateTreatmentSchema = treatmentSchema.partial();
