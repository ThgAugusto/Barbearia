import { Formik, Form, FormikHelpers } from "formik";
import TextInput from "../../../../../components/TextInput";
import { Button, Card } from "flowbite-react";
import { Data, FormProps } from "../../../../../types/barber";
import { createBarberSchema, updateBarberSchema } from "../../../../../schemas/barberValidationSchema";
import { Mail, User, Lock } from "lucide-react";
import { getChangedValues } from "../../../../../utils/getChangedValues";

const BarberForm: React.FC<FormProps> = ({ values, setShowForm, create, update }) => {
    const isUpdate = values.id !== undefined;
    const schema = isUpdate ? updateBarberSchema : createBarberSchema;

    return (
        <section className="px-48">
            <Card className=" px-10">
                <header className="border-b pb-4 mb-2">
                    <h1 className="text-2xl font-bold text-gray-700">
                        {isUpdate ? "Alterar Barbeiro" : " Novo Barbeiro"}
                    </h1>
                </header>
                <div>
                    <Formik
                        initialValues={values}
                        validationSchema={schema}
                        onSubmit={(formikValues, formikHelpers) => {
                            if (isUpdate) {
                                const partialValues = getChangedValues(formikValues, values, ['id', 'barbershopId']);
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
                                        icon={Lock}
                                        name="password"
                                        type="password"
                                        label="Senha"
                                        placeholder={isUpdate ? `•••••••••` : `Digite uma senha`}
                                        disabled={isUpdate}
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-cyan-900 mt-6">
                                    {isUpdate ? "Atualizar Barbeiro" : "Cadastrar Barbeiro"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Button color="gray" className="w-full mt-2 space-x-2"
                        onClick={() => setShowForm(false)}>
                        Voltar
                    </Button>
                </div>
            </Card>
        </section>
    );
};

export default BarberForm;
