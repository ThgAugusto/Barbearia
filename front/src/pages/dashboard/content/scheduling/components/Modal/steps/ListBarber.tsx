import { Barber } from "../../../../../../../types/barber";
import { Button } from "flowbite-react";
import { Beard, ScissorsAndComb } from "../../../../../../../assets/icons";
import { useNavigate } from "react-router-dom";

const ListBarbersStep = ({
    barbersData,
    onSelect,
    onSelected,
    isLoaded,
    onNext,
    onBack,
}: {
    barbersData: Barber[];
    onSelect: (id: number) => void;
    onSelected: number | null;
    isLoaded: boolean;
    onNext: () => void;
    onBack: () => void;
}) => {

    const activeBarbers = barbersData ? barbersData.filter((barbers) => barbers?.user.status === "ACTIVE") : [];

    if (activeBarbers.length === 0 && isLoaded) return <EmptyBarbers />;

    return (
        <section className="flex flex-1 flex-col justify-between">
            <div className="mt-3 max-h-[336px] overflow-y-auto pb-3 px-8">
                <h3 className="text-md font-semibold mb-4">Selecione um Barbeiro</h3>
                {activeBarbers.map((barber) => (
                    <div
                        key={barber.id}
                        onClick={() => {
                            onSelect(barber.id);
                            onNext();
                        }}
                        className={`mt-2 flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer
                            ${onSelected === barber.id ? "shadow-md bg-gray-100" : "hover:shadow-md"} `}
                    >
                        <div className="flex items-center mr-3">
                            <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                                <Beard className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-medium text-sm">{barber.user.name}</span>
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

const EmptyBarbers = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <ScissorsAndComb className="w-20 h-20 text-gray-300 mb-4" />
            <p className="text-gray-400 font-bold mb-4">Nenhum Barbeiro ativo encontrado</p>
            <Button size="sm" color="light" className="text-gray-400" onClick={() => navigate("/dashboard/barber?modalOpenBarber=true")}>
                Cadastrar Barbeiro
            </Button>
        </div>
    );
};


export default ListBarbersStep;
