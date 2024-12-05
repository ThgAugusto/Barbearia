import { useEffect } from "react";
import { Modal } from "flowbite-react";
import ProgressBar from "../../../../../../components/ProgressBar";
import { useSchedulingModal } from "../../../../../../hooks/scheduling/useScheduling";
import { ConfirmSchedulingStep } from "./steps/Confirm";
import ListBarbershopsStep from "./steps/ListBarbershops";
import ListTreatmentsStep from "./steps/ListTreatment";
import ListBarbersStep from "./steps/ListBarber";
import ListClientsStep from "./steps/ListClient";
import { Create } from "../../../../../../types/scheduling";

const SchedulingModal = ({ show, onClose, create, currentStep, setCurrentStep, selections, setSelections  }:
    {
        show: boolean;
        onClose: () => void;
        create: (scheduling: Create) => Promise<void>
        currentStep: number;
        setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
        selections: {
            barbershop: number | null;
            client: number | null;
            barber: number | null;
            treatment: number | null;
            time: Date | null;
        };
        setSelections: React.Dispatch<React.SetStateAction<typeof selections>>;
    }) => {
    const { loadBarbershops, loadTreatments, loadBarbers, loadClients, loadAvailableTimes, schedulingData, isLoaded } = useSchedulingModal();

    const steps = 5;

    const nextStep = () => {
        if (currentStep < steps) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSelect = (key: keyof typeof selections, value: number | Date | null) => {
        console.log('handleSelect', value, key);
        setSelections(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        if (!selections.barbershop && !isLoaded.barbershops) {
            loadBarbershops();
        } else if (selections.barbershop && currentStep === 2 && !isLoaded.treatments[selections.barbershop]) {
            loadTreatments(selections.barbershop);
        } else if (selections.barbershop && currentStep === 3 && !isLoaded.barbers[selections.barbershop]) {
            loadBarbers(selections.barbershop);
        } else if (selections.barbershop && currentStep === 4 && !isLoaded.clients[selections.barbershop]) {
            loadClients(selections.barbershop);
        }
    }, [currentStep]);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <ListBarbershopsStep
                        schedulingData={schedulingData.barbershops}
                        onSelected={selections.barbershop}
                        onSelect={(id: number) => handleSelect('barbershop', id)}
                        onNext={nextStep}
                        isLoaded={isLoaded.barbershops}
                        onClose={onClose}
                    />
                );
            case 2:
                if (!selections.barbershop) {
                    prevStep();
                    return null;
                }
                return (
                    <ListTreatmentsStep
                        treatmentsData={schedulingData.treatments[selections.barbershop]}
                        onSelected={selections.treatment}
                        onSelect={(id: number) => handleSelect('treatment', id)}
                        onNext={nextStep}
                        onBack={prevStep}
                        barbershopId={selections.barbershop}
                        isLoaded={isLoaded.treatments[selections.barbershop] || false}
                    />
                );
            case 3:
                if (!selections.barbershop) {
                    prevStep();
                    return null;
                }
                return (
                    <ListBarbersStep
                        barbersData={schedulingData.barbers[selections.barbershop] || []}
                        onSelected={selections.barber}
                        onSelect={(id: number) => handleSelect('barber', id)}
                        onNext={nextStep}
                        onBack={prevStep}
                        isLoaded={isLoaded.barbers[selections.barbershop] || false}
                    />
                );
            case 4:
                if (!selections.barbershop) {
                    prevStep();
                    return null;
                }
                return (
                    <ListClientsStep
                        clientsData={schedulingData.clients[selections.barbershop] || []}
                        onSelected={selections.client}
                        onSelect={(id: number) => handleSelect('client', id)}
                        onNext={nextStep}
                        onBack={prevStep}
                        isLoaded={isLoaded.clients[selections.barbershop] || false}
                    />
                );
            case 5:
                return (
                    <ConfirmSchedulingStep
                        onBack={prevStep}
                        selections={selections}
                        schedulingData={schedulingData}
                        loadAvailableTimes={loadAvailableTimes}
                        onSelect={(time: Date) => handleSelect('time', time)}
                        create={create}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Modal show={show} size="lg" popup onClose={onClose}>
            <Modal.Header className="bg-cyan-900 rounded-t-lg px-3 py-4 shadow-md">
                <span className="text-xl font-medium text-white">Agendar Atendimento</span>
            </Modal.Header>
            <div className="flex flex-col overflow-y-auto h-[500px]">
                <div className="px-8">
                    <div className="border-b py-10">
                        <ProgressBar currentStep={currentStep} totalSteps={steps} />
                    </div>
                </div>
                {renderStep()}
            </div>
        </Modal>
    );
};

export default SchedulingModal;
