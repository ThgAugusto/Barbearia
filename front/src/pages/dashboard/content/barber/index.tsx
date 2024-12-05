import useBarber from '../../../../hooks/barber/useBarber';
import { Button, Select } from "flowbite-react";
import BarberTable from './components/Table';
import { useState } from 'react';
import { Data } from '../../../../types/barber';
import { Scissors } from 'lucide-react';
import BarberModal from './components/Modal';

function BarberContent() {
    const { barbersData, barbershopsData, softDelete, create, update, restore, openModal, closeModal, isModalOpen } = useBarber();
    const initialState: Data = { id: undefined, name: "", email: "", password: "", cpf: "", barbershopId: 0 };
    const [values, setValues] = useState<Data>(initialState);
    const [selectedBarbershopId, setSelectedBarbershopId] = useState<number | null>(null);


    const handleBarbershopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value === "all" ? null : parseInt(event.target.value);
        setSelectedBarbershopId(selectedId);
    };

    const filteredBarbers = selectedBarbershopId
        ? barbersData.filter(barber => barber.barbershopId === selectedBarbershopId)
        : barbersData;

    return (
        <>
            <div className="flex flex-col justify-between bg-white rounded-lg shadow-lg p-6 pb-0">
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Barbeiros</h2>
                        <div className='flex space-x-3'>

                            <Button className="bg-cyan-900 rounded-3xl"
                                onClick={ () => { setValues(initialState); openModal()}}>
                                <span className="flex items-center">
                                    <Scissors className="w-4 h-4 mr-2" />Novo Barbeiro
                                </span>
                            </Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <BarberTable
                            barbersData={filteredBarbers}
                            setValues={setValues}
                            softDelete={softDelete}
                            restore={restore}
                            openModal={openModal}
                        />
                    </div>
                </section>
                <div className='flex justify-end items-center py-6'>
                    <Select sizing="sm" className="flex" onChange={handleBarbershopChange}>
                        <option value="all">TODAS BARBEARIAS..</option>
                        {barbershopsData.map((barbershop) => (
                            <option key={barbershop.id} value={barbershop.id}>
                                {barbershop.socialReason.toUpperCase()}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            <BarberModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                values={values}
                create={create}
                update={update}
                barbershopsData={barbershopsData}
            />
        </>
    );
}

export default BarberContent;
