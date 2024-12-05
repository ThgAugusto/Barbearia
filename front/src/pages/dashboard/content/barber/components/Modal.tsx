import { Modal } from "flowbite-react";
import { ModalProps } from "../../../../../types/barber";
import BarberForm from "./Form";

const BarberModal: React.FC<ModalProps> = ({
    isModalOpen,
    closeModal,
    values,
    update,
    create,
    barbershopsData
}) => {

    return (
        <Modal show={isModalOpen} size="md" popup onClose={() => closeModal()}>
            <Modal.Header className="bg-cyan-900 rounded-t-lg px-3 py-4 shadow-md">
                <span className="text-xl font-medium text-white dark:text-white">
                    {values.id ? "Editar Barbeiro" : "Cadastrar Barbeiro"}
                </span>
            </Modal.Header>
            <Modal.Body className="py-1">
                <div className="space-y-6">
                    <BarberForm 
                        values={values} 
                        update={update} 
                        create={create}
                        barbershopsData={barbershopsData}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default BarberModal;
