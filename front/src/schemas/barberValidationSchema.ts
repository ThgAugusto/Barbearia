import * as Yup from "yup";

export const createBarberSchema = Yup.object().shape({
    name: Yup.string()
        .required("Nome é obrigatório") 
        .min(2, "O nome deve ter pelo menos 2 caracteres"),

    email: Yup.string()
        .email("E-mail inválido") 
        .required("E-mail é obrigatório"), 

    password: Yup.string()
        .required("Senha é obrigatória")
        .min(6, "Senha deve ter no mínimo 6 caracteres") 
        .max(20, "Senha não pode ter mais de 20 caracteres"), 
});

export const updateBarberSchema = createBarberSchema.partial();
