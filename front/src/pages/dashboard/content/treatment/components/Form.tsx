import { Formik, Form, FormikHelpers } from "formik";
import TextInput from "../../../../../components/TextInput";
import { Button, Card } from "flowbite-react";
import { Data, FormProps } from "../../../../../types/treatment";
import { createTreatmentSchema, updateTreatmentSchema } from "../../../../../schemas/treatmentValidationsSchema";
import { User, DollarSign, Clock, FileText } from "lucide-react";
import { getChangedValues } from "../../../../../utils/getChangedValues";

const TreatmentForm: React.FC<FormProps> = ({ values, setShowForm, create, update }) => {
    const isUpdate = values.id !== undefined;
    const schema = isUpdate ? createTreatmentSchema : updateTreatmentSchema;

    return (
        <section className="px-48">
            <Card className=" px-10">
                <header className="border-b pb-4 mb-2">
                    <h1 className="text-2xl font-bold text-gray-700">
                        {isUpdate ? "Alterar Serviço" : "Novo Serviço"}
                    </h1>
                </header>
                <div>
                    <Formik
                        initialValues={values}
                        validationSchema={schema}
                        onSubmit={(formikValues, formikHelpers) => {
                            console.log('formikHelpers')
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
                                        icon={User}
                                        name="name"
                                        type="text"
                                        label="Nome do Serviço"
                                        placeholder="Exemplo: Corte Masculino"
                                    />
                                    <TextInput
                                        icon={DollarSign}
                                        name="price"
                                        type="number"
                                        label="Preço"
                                        placeholder="Exemplo: 50.00"
                                    />
                                    <TextInput
                                        icon={Clock}
                                        name="duration"
                                        type="number"
                                        label="Duração (minutos)"
                                        placeholder="Exemplo: 45"
                                    />
                                    <TextInput
                                        icon={FileText}
                                        name="description"
                                        type="text"
                                        label="Descrição (Opcional)"
                                        placeholder="Exemplo: Corte com lavagem e finalização"
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-cyan-900 mt-6">
                                    {isUpdate ? "Atualizar Serviço" : "Cadastrar Serviço"}
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

export default TreatmentForm;
