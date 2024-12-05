import * as yup from 'yup';

export const createClientSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'O nome do cliente deve ter pelo menos 5 caracteres.')
    .max(100, 'O nome do cliente deve ter no máximo 100 caracteres.')
    .required('O nome do cliente é obrigatório.') 
    .typeError('O nome do cliente deve ser um texto.'),

  phone: yup
    .string()
    .matches(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      'O número de telefone fornecido é inválido. O formato esperado é (99) 9999-9999 ou (99) 99999-9999.'
    )
    .max(15, 'O telefone deve ter no máximo 15 caracteres.')
    .required('O telefone do cliente é obrigatório.') 
    .typeError('O telefone deve ser um texto.'),

  email: yup
    .string()
    .email('O e-mail deve ser um endereço válido.')
    .max(100, 'O e-mail deve ter no máximo 100 caracteres.')
    .required('O e-mail do cliente é obrigatório.') 
    .typeError('O e-mail deve ser um texto.'),

  notes: yup
    .string()
    .max(500, 'As notas devem ter no máximo 500 caracteres.')
    .required('As notas são obrigatórias.') 
    .typeError('As notas devem ser um texto.'),

  barbershopId: yup
    .number()
    .required('A barbearia não pode estar vazia')
});


export const updateClientSchema = createClientSchema.partial();
