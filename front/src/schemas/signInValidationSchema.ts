import * as Yup from 'yup';

export const signInValidationSchema = () => {
  return Yup.object({
    email: Yup.string()
      .email('O e-mail fornecido é inválido (ex: falta @ ou domínio).')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .matches(/[A-Z]/, 'A senha deve ter uma letra maiúscula.')
      .matches(/\d/, 'A senha deve conter pelo menos um número.')
      .matches(/[@$!%*?&]/, 'A senha ter uma caractere especial.')
      .min(8, 'A senha deve ter no mínimo 8 caracteres.')
  });
};
