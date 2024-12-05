import { Mail, Lock, Scissors, LogOut, Phone, User, Key, IdCard } from "lucide-react";
import { Formik, Form, FormikHelpers } from 'formik';
import TextInput from "../../../components/TextInput";
import { signUpStepOneValidationSchema, signUpStepTwoValidationSchema } from "../../../schemas/signUpValidationSchema";
import useOwner from "../../../hooks/owner/useOwner";
import { useState } from "react";
import { DataStepOne, DataStepTwo } from "../../../types/owner";

function SignUp() {

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container max-w-[820px] ">
                <section className="shadow-xl rounded-xl bg-white w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="relative overflow-y-auto h-[525px] overflow-x-hidden">
                            <SignUpForm />
                        </div>
                        <aside className="relative flex items-center justify-center bg-cyan-900 text-white rounded-r-xl overflow-hidden">
                            <div className="absolute top-0 right-0 bg-cyan-800 h-12 w-[90%] rounded-bl-full"></div>
                            <div className="flex items-center space-x-4">
                                <Scissors className="w-24 h-24" />
                                <h1 className="text-3xl md:text-4xl font-bold">BarberPro</h1>
                            </div>
                            <div className=" w-[90%] absolute bottom-0 left-0 bg-cyan-800 h-12 rounded-tr-full"></div>
                        </aside>
                    </div>
                </section>
            </div>
        </main>
    );
}


const StepOne = () => {
    return (
        <div className="flex flex-col justify-center h-full w-full py-11 px-14">
            <header className="text-center mb-8 w-full">
                <h1 className="text-2xl font-bold text-gray-900">Seja Muito Bem-vindo!</h1>
                <p className="text-gray-500 text-sm">Cadastre uma conta para continuar...</p>
            </header>
            <TextInput icon={User} name="name" type="text" label="Nome" placeholder="Nome Completo" />
            <TextInput icon={Mail} name="email" type="email" label="Endereço de E-mail" placeholder="email@example.com" />
            <TextInput icon={Phone} name="phoneNumber" type="text" label="Telefone" placeholder="(XX) XXXX-XXXX" />
            <button
                type="submit"
                className="shadow-sm mt-8 w-full text-white font-semibold py-2 rounded-lg transition-colors bg-cyan-900 hover:bg-gray-800"
            >
                Continuar
            </button>
        </div>
    );
};

const StepTwo: React.FC<{ setStep: (step: number) => void }> = ({ setStep }) => {
    return (
        <div className="flex flex-col justify-center h-full w-full py-11 px-14">
            <header className="relative text-center mb-5 w-full">
                <h1 className="text-2xl font-bold text-gray-900">Finalize seu Cadastro!</h1>
                <p className="text-gray-500 text-sm">Termine de digitar seus dados...</p>
            </header>
            <TextInput icon={IdCard} name="cpf" type="text" label="CPF" placeholder="XXX.XXX.XXX-XX" />
            <TextInput icon={Lock} name="password" type="password" label="Senha" placeholder="Digite sua senha" />
            <TextInput icon={Key} name="confirmPassword" type="password" label="Confirme sua Senha" placeholder="Confirme sua senha" />
            <button type="submit" className="shadow-sm mt-5 w-full text-white font-semibold py-2 rounded-lg transition-colors bg-cyan-900 hover:bg-gray-800 border border-cyan-900">
                Cadastrar-se
            </button>
            <button onClick={() => setStep(1)} type="button" className="flex items-center justify-center space-x-2 shadow-sm mt-3 w-full text-cyan-900 font-semibold py-2 rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 border border-cyan-900">
                <LogOut className="w-5 h-5" />Voltar
            </button>
        </div>
    );
};


const SignUpForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const { create } = useOwner();
    const [stepOneHelpers, setStepOneHelpers] = useState<FormikHelpers<DataStepOne> | null>(null);
    const [formData, setFormData] = useState<DataStepOne & DataStepTwo>({
        name: '',
        email: '',
        phoneNumber: '',
        cpf: '',
        password: '',
        confirmPassword: '',
    });

    const handleStepOneSubmit = (values: DataStepOne, helpers: FormikHelpers<DataStepOne>) => {
        setStepOneHelpers(helpers);
        setFormData(prevData => ({
            ...prevData,
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
        }));
        setStep(2);
    };

    const handleStepTwoSubmit = (values: DataStepTwo, helpers: FormikHelpers<DataStepTwo>) => {
        const combinedValues = { ...formData, cpf: values.cpf, password: values.password, confirmPassword: values.confirmPassword };
        if (stepOneHelpers) {
            create(combinedValues, stepOneHelpers, helpers, setStep);
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phoneNumber: '',
                }}
                validationSchema={signUpStepOneValidationSchema}
                onSubmit={handleStepOneSubmit}
            >
                {() => (
                    <Form className={`absolute inset-0 transition-all duration-500 ease-in-out ${step === 1 ? 'translate-x-0' : '-translate-x-[100%]'}`}>
                        <StepOne />
                    </Form>
                )}
            </Formik>

            <Formik
                initialValues={{
                    cpf: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={signUpStepTwoValidationSchema}
                onSubmit={handleStepTwoSubmit}
            
            >
                {() => (
                    <Form className={`absolute inset-0 transition-all duration-500 ease-in-out ${step === 2 ? 'translate-x-0' : 'translate-x-[120%]'}`}>
                        <StepTwo setStep={setStep} />
                    </Form>
                )}
            </Formik>
        </>
    );
};


export default SignUp;


