import { Button } from "flowbite-react";
import { Barbershop } from "../../../../../../../types/barbershop";
import { Barbershop as BarbershopIcon } from "../../../../../../../assets/icons";
import { useNavigate } from "react-router-dom";

const ListBarbershopsStep = ({
    schedulingData,
    onSelect,
    isLoaded,
    onSelected,
    onNext,
    onClose,
}: {
    schedulingData: Barbershop[];
    onSelect: (id: number) => void;
    isLoaded: boolean;
    onSelected: number | null;
    onNext: () => void;
    onClose: () => void
}) => {

    const activeBarbershops = schedulingData ? schedulingData.filter((barbershop) => barbershop?.status === "ACTIVE") : [];

    if (activeBarbershops.length === 0 && isLoaded) return <EmptyBarbershop />
    return (
        <section className="flex flex-1 flex-col justify-between">
            <div className="mt-3  max-h-[336px] overflow-y-auto pb-3 px-8">
                <h3 className="text-md font-semibold mb-3">Selecione uma Barbearia</h3>
                {activeBarbershops.map((barbershop) => (
                    <div
                        key={barbershop.id}
                        onClick={() => {
                            console.log(barbershop)

                            onSelect(barbershop.id);
                            onNext();
                        }}
                        className={`relative mt-2 flex items-center p-3 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer
                            ${onSelected === barbershop.id ? "shadow-md bg-gray-100" : "hover:shadow-md"}`}
                    >
                        <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mr-3 text-sm font-semibold">
                            {barbershop.socialReason
                                .split(" ")
                                .map((word) => word[0])
                                .join("")}
                        </div>

                        <div className="flex flex-col">
                            <span className="font-medium text-sm">
                                {barbershop.socialReason},{" "}
                                <span className="text-xs text-gray-600 ml-1">{barbershop.cnpj}</span>
                            </span>
                            <span className="text-xs text-gray-500">{barbershop.address}</span>
                            <span className="text-xs text-gray-400">{barbershop.phoneNumber}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-8">
                <div className="flex border-t py-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg px-6 py-2 text-xs border text-gray-700 bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                    >
                        Cancelar
                    </button>

                </div>
            </div>
        </section>
    );
};

const EmptyBarbershop = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <BarbershopIcon className="w-20 h-20 text-gray-300 mb-4" />
            <p className="text-gray-400 font-bold mb-4">Nenhum Barbearia ativa encontrada</p>
            <Button size="sm" color="light" className="text-gray-400 " onClick={() => navigate("/dashboard/barbershop?modalOpenBarbershop=true")}>
                Cadastrar Barbearia
            </Button>
        </div>
    );
};

export default ListBarbershopsStep;
