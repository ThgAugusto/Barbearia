import * as Yup from 'yup';

export const signUpStepOneValidationSchema = Yup.object({
  name: Yup.string()
    .required('O nome é obrigatório.')
    .min(5, 'O nome deve ter pelo menos 5 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.')
    .typeError('O nome deve ser um texto.'),

  email: Yup.string()
    .required('O e-mail é obrigatório.')
    .email('O e-mail fornecido é inválido (ex: falta @ ou domínio).'),

  phoneNumber: Yup.string()
    .required('O número de telefone é obrigatório.')
    .matches(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, 'Número de telefone inválido.')
});


export const signUpStepTwoValidationSchema = Yup.object({
  cpf: Yup.string()
    .required('O CPF é obrigatório.')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'O CPF deve estar no formato XXX.XXX.XXX-XX.'),

  password: Yup.string()
    .required('A senha é obrigatória.')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula.')
    .matches(/\d/, 'A senha deve conter pelo menos um número.')
    .matches(/[@$!%*?&]/, 'A senha deve conter pelo menos um caractere especial.')
    .min(8, 'A senha deve ter no mínimo 8 caracteres.'),

  confirmPassword: Yup.string()
    .required('A confirmação de senha é obrigatória.')
    .oneOf([Yup.ref('password')], 'As senhas não coincidem.')
});
