import { Formik, Form, FormikHelpers } from "formik";
import TextInput from "../../../../../components/TextInput";
import { Button } from "flowbite-react";
import { getChangedValues } from "../../../../../utils/getChangedValues";
import { Data, FormProps } from "../../../../../types/client";
import { createClientSchema, updateClientSchema } from "../../../../../schemas/clientValidationSchemas";
import SelectFormik from "../../../../../components/SelectInput";


const ClientForm: React.FC<FormProps> = ({ values, update, create, barbershopsData }) => {
    const isUpdate = values.id !== undefined;
    const schema = isUpdate ? updateClientSchema : createClientSchema;
    
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
                            name="name"
                            type="text"
                            label="Nome"
                            placeholder="Exemplo: João da Silva"
                        />
                        <TextInput
                            name="phone"
                            type="text"
                            label="Telefone"
                            placeholder="Exemplo: (11) 91234-5678"
                        />
                        <TextInput
                            name="email"
                            type="email"
                            label="E-mail"
                            placeholder="Exemplo: joao@email.com"
                        />
                        <TextInput
                            name="notes"
                            type="text"
                            label="Observações"
                            placeholder="Informações adicionais sobre o cliente (opcional)"
                        />

                       <SelectFormik
                                name="barbershopId"
                                label="Selecione a Barbearia"
                                options={barbershopsData.map((barbershop) => ({
                                    value: barbershop.id,
                                    label: barbershop.socialReason,
                                }))}
                            />
                    </div>
                    <Button type="submit" className="w-full bg-cyan-900 mt-6">
                        {isUpdate ? "Atualizar Cliente" : "Cadastrar Cliente"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default ClientForm;
