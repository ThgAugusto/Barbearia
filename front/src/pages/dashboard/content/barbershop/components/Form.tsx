import { Formik, Form, FormikHelpers } from "formik";
import TextInput from "../../../../../components/TextInput";
import { Button } from "flowbite-react";
import { Data, FormProps } from "../../../../../types/barbershop";
import { createBarbershopSchema, updateBarbershopSchema } from "../../../../../schemas/barbershopValidationSchema";
import { getChangedValues } from "../../../../../utils/getChangedValues";
import { Mail } from "lucide-react";


const BarbershopForm: React.FC<FormProps> = ({ values, update, create }) => {
    const isUpdate = values.id !== undefined;
    const schema = isUpdate ? createBarbershopSchema : updateBarbershopSchema

    return (
        <Formik
            initialValues={values}
            validationSchema={schema}
            onSubmit={(formikValues, formikHelpers) => {
                if (isUpdate) {
                    const partialValues = getChangedValues(formikValues, values, ['id']);
                    update(partialValues, formikHelpers as FormikHelpers<Partial<Data>>);
                } else {
                    create(formikValues, formikHelpers);
                }
            }}
        >
            {() => (
                <Form>
                    <div className="space-y-4">
                        <TextInput
                            name="socialReason"
                            type="text"
                            label="Razão Social"
                            placeholder="Exemplo: Barbearia Estilos Ltda."
                            icon={Mail}
                        />
                        <TextInput
                            name="tradeName"
                            type="text"
                            label="Nome Fantasia"
                            placeholder="Exemplo: Barbearia Estilos"
                            icon={Mail}
                        />
                        <TextInput
                            name="cnpj"
                            type="text"
                            label="CNPJ"
                            placeholder="Exemplo: 00.000.000/0001-00"
                            icon={Mail}
                        />
                        <TextInput
                            name="address"
                            type="text"
                            label="Endereço"
                            placeholder="Exemplo: Rua das Flores, 123, Centro, São Paulo - SP"
                            icon={Mail}
                        />

                        <TextInput
                            name="phoneNumber"
                            type="text"
                            label="Número de telefone"
                            placeholder="Exemplo: (11) 91234-5678"
                            icon={Mail}
                        />
                    </div>
                    <Button type="submit" className="w-full bg-cyan-900 mt-6">
                        {isUpdate ? "Atualizar Dados" : "Cadastrar"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default BarbershopForm;
