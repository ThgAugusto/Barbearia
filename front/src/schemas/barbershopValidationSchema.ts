import * as Yup from 'yup';

export const createBarbershopSchema = Yup.object().shape({
    socialReason: Yup.string()
        .min(5, 'A razão social deve ter pelo menos 5 caracteres.')
        .max(255, 'A razão social deve ter no máximo 255 caracteres.')
        .required('A razão social é obrigatória.'),

    tradeName: Yup.string()
        .max(255, 'O nome fantasia deve ter no máximo 255 caracteres.')
        .notRequired(),

    cnpj: Yup.string()
        .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'O CNPJ fornecido é inválido. O formato esperado é XX.XXX.XXX/XXXX-XX.')
        .required('O CNPJ é obrigatório.'),

    address: Yup.string()
        .min(5, 'O endereço deve ter pelo menos 5 caracteres.')
        .max(255, 'O endereço deve ter no máximo 255 caracteres.')
        .required('O endereço é obrigatório.'),

    phoneNumber: Yup.string()
        .matches(
            /^\(\d{2}\) \d{4,5}-\d{4}$/,
            'O número de telefone fornecido é inválido. O formato esperado é (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.'
        )
        .required('O número de telefone é obrigatório.'),
});

export const updateBarbershopSchema = createBarbershopSchema.partial();
