import { Button } from "flowbite-react";
import { CalendarIcon } from "lucide-react";
import SchedulingModal from "./components/Modal/Modal.tsx";
import Calendar from "./components/Calendar.tsx";
import { useSchedulingActions } from "../../../../hooks/scheduling/useScheduling.ts";
import { useState } from "react";
import { Scheduling } from "../../../../types/scheduling.ts";
import SchedulingDetailsModal from "./components/Modal/ModalDetails.tsx";


function SchedulingContent() {
    const { create, showModal, openModal, closeModal, currentStep, setCurrentStep, selections, setSelections, schedulingData, barbersData, barbershopsData, markAsCompleted, softDelete, modalSchedulings, setModalSchedulings } = useSchedulingActions();
    const [showModalDetails, setShowModalDetails] = useState(false);

    const openModalDetails = (schedulings: Scheduling[]) => {
        setModalSchedulings(schedulings);
        setShowModalDetails(true);
    };

    const closeModalDetails = () => {
        setModalSchedulings([]);
        setShowModalDetails(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Agendamentos</h2>
                <Button
                    className="rounded-3xl bg-cyan-900"
                    onClick={openModal}
                >
                    <span className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Novo Agendamento
                    </span>
                </Button>
            </div>
            <Calendar
                openModalDetails={openModalDetails}
                schedulings={schedulingData}
                barbershopsData={barbershopsData}
            />

            <SchedulingModal
                show={showModal}
                onClose={closeModal}
                create={create}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                selections={selections}
                setSelections={setSelections}
            />

            <SchedulingDetailsModal
                show={showModalDetails}
                onClose={closeModalDetails}
                schedulings={modalSchedulings}
                barbersData={barbersData}
                markAsCompleted={markAsCompleted}
                softDelete={softDelete}
            />
        </div>
    );
}
export default SchedulingContent;
