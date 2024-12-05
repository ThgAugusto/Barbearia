import { useNavigate } from "react-router-dom";
import { HaircutTools, ShortHairAndScissors } from "../../../../../../../assets/icons";
import { Treatment } from "../../../../../../../types/treatment";
import { Button } from "flowbite-react";

const ListTreatmentsStep = ({
    treatmentsData,
    onSelect,
    onSelected,
    isLoaded,
    onNext,
    onBack,
    barbershopId
}: {
    treatmentsData: Treatment[];
    onSelect: (id: number) => void;
    onSelected: number | null;
    isLoaded: boolean;
    onNext: () => void;
    onBack: () => void;
    barbershopId: number;
}) => {

    const activeTreatments = treatmentsData ? treatmentsData.filter((treatment) => treatment.status === "ACTIVE") : [];
    if (activeTreatments.length === 0 && isLoaded) return <EmptyTreatment barbershopId={barbershopId} />;

    return (
        <section className="flex flex-1 flex-col justify-between">
            <div className="mt-3 max-h-[336px] overflow-y-auto pb-3 px-8">
                <h3 className="text-md font-semibold mb-4">Selecione um Serviço</h3>
                {activeTreatments.map((treatment) => (
                    <div
                        key={treatment.id}
                        onClick={() => {
                            onSelect(treatment.id);
                            onNext();
                        }}
                        className={`mt-2 flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer
                            ${onSelected === treatment.id ? "shadow-md bg-gray-100" : "hover:shadow-md"} `}
                    >
                        <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mr-3 text-sm font-semibold">
                            <HaircutTools className="w-6 h-6" />
                        </div>

                        <div className="flex flex-col">
                            <span className="font-medium text-sm">{treatment.name}</span>
                            <span className="text-xs text-gray-500">{treatment.description}</span>
                            <span className="text-xs text-gray-400">
                                R${treatment.price} - {treatment.duration} min
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="px-8">
                <div className="flex border-t py-3 ">
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

const EmptyTreatment = ({ barbershopId }: { barbershopId: number }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <ShortHairAndScissors className="w-20 h-20 text-gray-300 mb-4" />
            <p className="text-gray-400 font-bold mb-4">Nenhum Serviço ativo encontrado</p>
            <Button size="sm" color="light" className="text-gray-400" onClick={() => navigate(`/dashboard/barbershop?treatment=true&barbershopId=${barbershopId}&modalOpenTreatment=true`)}>
                Cadastrar Serviço
            </Button>
        </div>
    );
};


export default ListTreatmentsStep;
