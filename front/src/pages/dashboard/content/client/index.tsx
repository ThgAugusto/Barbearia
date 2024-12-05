import { Button, Select } from 'flowbite-react';
import { User } from 'lucide-react';
import useClient from '../../../../hooks/client/useClient';
import ClientTable from './components/Table';
import { useState } from 'react';
import ClientModal from './components/Modal';
import { Data } from '../../../../types/client';

function ClientContent() {
    const { clientsData, barbershopsData, create, update, softDelete, restore, openModal, closeModal, isModalOpen } = useClient();
    const initialState: Data = { id: undefined, name: "", email: "", phone: "", notes: "", barbershopId: 0 };
    const [values, setValues] = useState<Data>(initialState);
    const [selectedBarbershopId, setSelectedBarbershopId] = useState<number | null>(null);

    const handleBarbershopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value === "all" ? null : parseInt(event.target.value);
        setSelectedBarbershopId(selectedId);
    };

    const filteredClients = selectedBarbershopId
        ? clientsData.filter(client => client.barbershopId === selectedBarbershopId)
        : clientsData;

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-6 pb-0">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>

                    <div className='flex space-x-3'>
                        <Button className="bg-cyan-900 rounded-3xl"
                            onClick={() => {setValues(initialState); openModal();}}>
                            <span className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                Novo Cliente
                            </span>
                        </Button>
                    </div>

                </div>
                <div className="overflow-x-auto">
                    <ClientTable
                        clientsData={filteredClients}
                        setValues={setValues}
                        softDelete={softDelete}
                        restore={restore}
                        openModal={openModal}
                    />
                </div>

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

            <ClientModal
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

export default ClientContent;
