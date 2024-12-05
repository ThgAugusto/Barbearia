import { Scissors } from 'lucide-react';
import useBarbershops from '../../../../hooks/barbershop/useBarbershop';
import { Button, } from "flowbite-react";
import BarbershopModal from './components/Modal';
import BarbershopTable from './components/Table';
import { useState } from 'react';
import { Data } from '../../../../types/barbershop';
import TreatmentContent from '../treatment';
import { useTreatmentModal } from '../../../../hooks/treatment/useTreatment';

function BarbershopContent() {
    const { barbershopsData, update, create, softDelete, restore, openModal, closeModal, isModalOpen } = useBarbershops();
    const initialState: Data = { id: undefined, socialReason: "", tradeName: "", cnpj: "", address: "", phoneNumber: "" }
    const [values, setValues] = useState<Data>(initialState);
    const { openTreatmentModal, closeTreatmentModal, isModalOpenTreatment, barbershopId } = useTreatmentModal();


    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Estabelecimentos</h2>
                    <Button className="bg-cyan-900 rounded-3xl" onClick={() => { setValues(initialState); openModal() }}>
                        <span className="flex items-center">
                            <Scissors className="w-4 h-4 mr-2" /> Nova Barbearia
                        </span>
                    </Button>

                </div>

                <BarbershopTable
                    barbershopsData={barbershopsData}
                    setValues={setValues}
                    openModal={openModal}
                    softDelete={softDelete}
                    openTreatmentModal={openTreatmentModal}
                    restore={restore}
                />

            </div>
            <BarbershopModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                values={values}
                update={update}
                create={create}
            />


            {barbershopId && (
                <TreatmentContent
                    barbershopId={barbershopId}
                    isModalOpen={isModalOpenTreatment}
                    closeModal={closeTreatmentModal}
                />
            )}



        </>
    );
}



export default BarbershopContent;
