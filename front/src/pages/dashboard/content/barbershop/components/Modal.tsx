import { Modal } from "flowbite-react";
import BarbershopForm from "./Form"; 
import { ModalProps } from "../../../../../types/barbershop";


const BarbershopModal: React.FC<ModalProps> = ({
    isModalOpen,
    closeModal,
    values,
    update,
    create
}) => {

    return (
        <Modal show={isModalOpen} size="md" popup onClose={() => closeModal()}>
            <Modal.Header className="bg-cyan-900 rounded-t-lg px-3 py-4 shadow-md">
                <span className="text-xl font-medium text-white dark:text-white">
                    {values.id ? "Editar Barbearia" : "Cadastrar Barbearia"}
                </span>
            </Modal.Header>
            <Modal.Body className="py-6">
                <div className="space-y-6">
                    <BarbershopForm 
                    values={values} 
                    update={update} 
                    create={create}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default BarbershopModal;
