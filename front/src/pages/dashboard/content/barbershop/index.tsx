import { Scissors } from 'lucide-react';
import useBarbershops from '../../../../hooks/barbershop/useBarbershop';
import { Button, } from "flowbite-react";
import BarbershopModal from './components/Modal';
import BarbershopTable from './components/Table';
import { useState } from 'react';
import { Data } from '../../../../types/barbershop';
import BarberContent from '../barber';

function BarbershopContent() {
    const { barbershopData, update, create, softDelete, barbershopId, handleCloseBarberModal, handleOpenBarberModal, openModalBarber, restore } = useBarbershops();
    const [openModal, setOpenModal] = useState(false);

    const [values, setValues] = useState<Data>({
        id: undefined,
        socialReason: "",
        tradeName: "",
        cnpj: "",
        address: "",
        phoneNumber: "",
    });

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Estabelecimentos</h2>
                    <Button type="submit" className="bg-cyan-900" onClick={() => setOpenModal(true)}>
                        <Scissors className="w-4 h-4" /> Nova Barbearia
                    </Button>

                </div>
                <div className="overflow-x-auto">
                    <BarbershopTable
                        barbershopData={barbershopData}
                        setValues={setValues}
                        setOpenModal={setOpenModal}
                        softDelete={softDelete}
                        handleOpenBarberModal={handleOpenBarberModal}
                        restore={restore}
                    />
                </div>
            </div>
            <BarbershopModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                values={values}
                update={update}
                create={create}

            />

            {barbershopId && (
                <BarberContent
                    openModalBarber={openModalBarber}
                    barbershopId={barbershopId}
                    handleCloseBarberModal={handleCloseBarberModal}
                />
            )}

        </>
    );
}



export default BarbershopContent;
