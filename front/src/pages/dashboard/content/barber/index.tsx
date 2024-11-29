import useBarber from '../../../../hooks/barber/useBarber';
import { Button, Modal, } from "flowbite-react";
import BarberTable from './components/Table';
import { useState } from 'react';
import { Data } from '../../../../types/barber';
import { Scissors } from 'lucide-react';
import BarberForm from './components/Form';
import { BarberContentProps } from '../../../../types/barber';


function BarberContent({ openModalBarber, barbershopId, handleCloseBarberModal }: BarberContentProps) {
    const { barberData, softDelete, create, update, restore } = useBarber(barbershopId);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [values, setValues] = useState<Data>({
        id: undefined,
        name: "",
        email: "",
        password: "",
        barbershopId: barbershopId,
    });

    return (
        <>
            <Modal show={openModalBarber} size="4xl" popup onClose={() => handleCloseBarberModal()}>
                <Modal.Header className="bg-cyan-900 rounded-t-lg px-3 py-4 shadow-md">
                    <span className="text-xl font-medium text-white dark:text-white">
                        Controle de Barbeiros da { }
                    </span>
                </Modal.Header>
                <Modal.Body className="pt-6 bg-gray-100 min-h-[520px]">
                    {!showForm ? (

                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Barbeiros</h2>
                                <Button size="sm" type="submit" className="bg-cyan-900"
                                    onClick={() => setShowForm(true)}
                                >
                                    <Scissors className="w-4 h-4" /> Novo Barbeiro
                                </Button>
                            </div>
                            <div className="overflow-x-auto">
                                <BarberTable
                                    barberData={barberData}
                                    setValues={setValues}
                                    softDelete={softDelete}
                                    setShowForm={setShowForm}
                                    restore={restore}
                                />
                            </div>
                        </div>
                    ) : (
                        <BarberForm
                            create={create}
                            update={update}
                            values={values}
                            setShowForm={setShowForm}
                        />
                    )
                    }

                </Modal.Body>
            </Modal>

        </>
    );
}



export default BarberContent;
