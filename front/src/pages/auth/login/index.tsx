import { Mail, Lock, Scissors } from "lucide-react";

export default function Login() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="shadow-xl rounded-xl bg-white ">
                <div className="grid grid-cols-1 md:grid-cols-2">

                    <div className="p-14">
                        <header className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-gray-900">Seja Bem-vindo de volta!</h1>
                            <p className="text-gray-500 text-sm">Acesse sua conta para continuar...</p>
                        </header>

                        <form action="">
                            <label className="block">
                                Endereço de E-mail
                                <div className="relative flex items-center">
                                    <Mail className="w-5 h-5 text-gray-500 absolute left-3" />
                                    <input
                                        type="email"
                                        className="w-full py-3 pl-12 border bg-gray-200 rounded-lg focus:outline-none focus:ring-2"
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>
                            </label>
                            
                            <label className="block mt-5">
                                Senha
                                <div className="relative flex items-center">
                                    <Lock className="w-5 h-5 text-gray-500 absolute left-3" />
                                    <input
                                        type="password"
                                        className="w-full py-3 pl-12 pr-4 border bg-gray-200 rounded-lg focus:outline-none focus:ring-2"
                                        placeholder='•••••••••' 
                                        required
                                    />
                                </div>
                                <a href="#" className="mt-2 text-sm underline text-gray-500">
                                    Esqueceu sua senha?
                                </a>
                            </label>

                            <button
                                type="submit"
                                className="mt-10 w-full bg-gray-900 text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Entrar
                            </button>
                        </form>
                    </div>

                    <aside className="relative flex items-center justify-center bg-gray-900 text-white rounded-r-xl overflow-hidden">
                        <div
                            className="absolute top-0 right-0 bg-gray-800 h-12 w-[90%] rounded-bl-full"

                        ></div>

                        <div className="flex items-center space-x-4">
                            <Scissors className="w-24 h-24" />
                            <h1 className="text-3xl md:text-4xl font-bold">BarberPro</h1>
                        </div>

                        <div
                            className=" w-[90%] absolute bottom-0 left-0 bg-gray-800 h-12 rounded-tr-full"
                        ></div>
                    </aside>

                </div>
            </section>
        </main>
    );
}
