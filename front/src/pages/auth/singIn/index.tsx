import { Mail, Lock, Scissors } from "lucide-react";
import { Formik, Form } from 'formik';
import { useSignIn } from "../../../hooks/auth/useSingIn";
import TextInput from "../../../components/TextInput";

export default function SingIn() {

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="container max-w-[820px] ">
                <section className="shadow-xl rounded-xl bg-white w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        <div className="flex flex-col justify-center p-14 overflow-y-auto h-[480px]">
                            <header className="text-center mb-10 w-full">
                                <h1 className="text-2xl font-bold text-gray-900">Seja Bem-vindo de volta!</h1>
                                <p className="text-gray-500 text-sm">Acesse sua conta para continuar...</p>
                            </header>

                            <SingInForm />
                        </div>

                        <aside className="relative flex items-center justify-center bg-cyan-900 text-white rounded-r-xl overflow-hidden">
                            <div
                                className="absolute top-0 right-0 bg-cyan-800 h-12 w-[90%] rounded-bl-full"

                            ></div>

                            <div className="flex items-center space-x-4">
                                <Scissors className="w-24 h-24" />
                                <h1 className="text-3xl md:text-4xl font-bold">BarberPro</h1>
                            </div>

                            <div
                                className=" w-[90%] absolute bottom-0 left-0 bg-cyan-800 h-12 rounded-tr-full"
                            ></div>
                        </aside>

                    </div>
                </section>
            </div>
        </main>
    );
}


const SingInForm: React.FC = () => {
    const { handleSignIn, signInValidationSchema } = useSignIn();
    return (
        <>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={signInValidationSchema}
                onSubmit={handleSignIn}
            >
                {() => (
                    <Form>
                        <div className="space-y-3">
                            <TextInput
                                name="email"
                                type="email"
                                label="Endereço de E-mail"
                                placeholder="email@example.com"
                                icon={Mail}
                            />

                            <TextInput
                                name="password"
                                type="password"
                                label="Senha"
                                placeholder="•••••••••"
                                icon={Lock}
                            />
                        </div>

                        <div>
                            <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                                Esqueceu sua senha?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className={`shadow-sm mt-10 w-full  text-white font-semibold py-2 rounded-lg transition-colors bg-cyan-900 hover:bg-gray-800`}>
                            Entrar
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};