import { Client } from "../../../../../../../types/client";
import { Button } from "flowbite-react";
import { User } from "lucide-react";
import { Hairdresser } from "../../../../../../../assets/icons";
import { useNavigate } from "react-router-dom";

const ListClientsStep = ({
    clientsData,
    onSelect,
    onSelected,
    isLoaded,
    onNext,
    onBack,
}: {
    clientsData: Client[];
    onSelect: (id: number) => void;
    onSelected: number | null;
    isLoaded: boolean;
    onNext: () => void;
    onBack: () => void;
}) => {

    const activeClients = clientsData ? clientsData.filter((client) => client.status === "ACTIVE") : [];

    if (activeClients.length === 0 && isLoaded) return <EmptyClients />

    return (
        <section className="flex flex-1 flex-col justify-between">
            <div className="mt-3 max-h-[336px] overflow-y-auto pb-3 px-8">
                <h3 className="text-md font-semibold mb-4">Selecione um Cliente</h3>
                {activeClients.map((client) => (
                    <div
                        key={client.id}
                        onClick={() => {
                            onSelect(client.id);
                            onNext();
                        }}
                        className={`mt-2 flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer
                            ${onSelected === client.id ? "shadow-md bg-gray-100" : "hover:shadow-md"}`}
                    >
                        <div className="flex items-center mr-3">
                            <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                                <User className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-medium text-sm">{client.name}</span>
                            <span className="text-xs text-gray-500">{client.phone}</span>
                            <span className="text-xs text-gray-400">{client.email}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-8">
                <div className="flex border-t py-3">
                    <button
                        onClick={onBack}
                        className="rounded-lg px-6 py-2 text-xs border text-gray-700 bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                    >
                        Voltar
                    </button>

                </div>
            </div>
        </section>
    );
};

const EmptyClients = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Hairdresser className="w-20 h-20 text-gray-300 mb-4" />
            <p className="text-gray-400 font-bold mb-4">Nenhum cliente ativo encontrado</p>
            <Button size="sm" color="light" className="text-gray-400" onClick={() => navigate("/dashboard/clients?modalOpenClient=true")}>
                Cadastrar Cliente
            </Button>
        </div>
    );
};

export default ListClientsStep;

