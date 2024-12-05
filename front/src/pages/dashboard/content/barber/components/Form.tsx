import { Formik, Form, FormikHelpers } from "formik";
import TextInput from "../../../../../components/TextInput";
import { Button } from "flowbite-react";
import { Data, FormProps } from "../../../../../types/barber";
import { createBarberSchema, updateBarberSchema } from "../../../../../schemas/barberValidationSchema";
import { Mail, User, Lock, IdCard } from "lucide-react";
import { getChangedValues } from "../../../../../utils/getChangedValues";
import SelectFormik from "../../../../../components/SelectInput";

const BarberForm: React.FC<FormProps> = ({ values, create, update, barbershopsData }) => {
    const isUpdate = values.id !== undefined;
    const schema = isUpdate ? updateBarberSchema : createBarberSchema;
    console.log('barber', values)
    return (
        <Formik
            initialValues={values}
            validationSchema={schema}
            onSubmit={(formikValues, formikHelpers) => {
                if (isUpdate) {
                    const partialValues = getChangedValues(formikValues, values, ['id']);
                    console.log('barber', partialValues, )
                    update(partialValues, formikHelpers as FormikHelpers<Partial<Data>>);
                } else {
                    create(formikValues, formikHelpers);
                }
            }}
        >
            {() => (
                <div className="p-5">
                    <Form>
                        <div className="space-y-4">
                            <TextInput
                                icon={User}
                                name="name"
                                type="text"
                                label="Nome do Barbeiro"
                                placeholder="Exemplo: João Silva"
                            />
                            <TextInput
                                icon={Mail}
                                name="email"
                                type="email"
                                label="E-mail"
                                placeholder="Exemplo: joao.silva@email.com"
                            />

                            <TextInput
                                icon={IdCard}
                                name="cpf"
                                type="text"
                                label="CPF"
                                placeholder="XXX.XXX.XXX-XX"
                                disabled={isUpdate}
                            />


                            <SelectFormik
                                name="barbershopId"
                                label="Selecione a Barbearia"
                                options={barbershopsData.map((barbershop) => ({
                                    value: barbershop.id,
                                    label: barbershop.socialReason,
                                }))}
                            />

                            <TextInput
                                icon={Lock}
                                name="password"
                                type="password"
                                label="Senha"
                                placeholder={isUpdate ? "•••••••••" : "Digite uma senha"}
                                disabled={isUpdate}
                            />
                        </div>
                        <Button type="submit" className="w-full bg-cyan-900 mt-6">
                            {isUpdate ? "Atualizar Barbeiro" : "Cadastrar Barbeiro"}
                        </Button>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default BarberForm;
