import { Modal } from "flowbite-react";
import { Data, ContentProps } from "../../../../types/treatment";
import { useTreatment } from "../../../../hooks/treatment/useTreatment";
import TreatmentTable from "./components/Table";
import { useState } from "react";
import TreatmentForm from "./components/Form";

function TreatmentContent({ isModalOpen, closeModal, barbershopId }: ContentProps) {
    const { treatmentsData, create, update, softDelete, restore, barbershop, showForm, setShowForm } = useTreatment(barbershopId)
    const initialState: Data = {
        id: undefined,
        name: "",
        price: 0,
        duration: 0,
        description: "",
        barbershopId: barbershopId
    }

    const [values, setValues] = useState<Data>(initialState);

 
    return (
        <>
            <Modal show={isModalOpen} size="4xl" popup onClose={() => closeModal()}>
                <Modal.Header className="bg-cyan-900 rounded-t-lg px-3 py-4 shadow-md">
                    <span className="text-xl font-medium text-white dark:text-white">
                     Controle de Serviços <span className="font-bold ml-1">#{barbershop?.cnpj}</span>
                    </span>
                </Modal.Header>
                <Modal.Body className="pt-6 bg-gray-100 min-h-[520px]">
                    {!showForm ? (
                        <>
                            <TreatmentTable
                                treatmentData={treatmentsData}
                                softDelete={softDelete}
                                restore={restore}
                                setValues={setValues}
                                setShowForm={setShowForm}
                            />
                        </>
                    ) : (
                        <>
                            <TreatmentForm
                                values={values}
                                setShowForm={setShowForm}
                                create={create}
                                update={update}
                            />
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default TreatmentContent;
