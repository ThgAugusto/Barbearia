import { Dropdown } from 'flowbite-react';
import { Client, TableProps } from '../../../../../types/client';
import { User, Phone, Mail, EllipsisVertical, Pencil, Ban, RotateCcw } from 'lucide-react';

const ClientTable: React.FC<TableProps> = ({ clientsData, setValues, openModal, softDelete, restore }) => {

    const ClientActionsDropdown: React.FC<{ client: Omit<Client, 'barbershop'> }> = ({ client }) => (
        <Dropdown
            className="z-50 absolute"
            arrowIcon={false}
            label={<EllipsisVertical className='w-5 h-5' />}
            placement="bottom" inline >
            <Dropdown.Header>
                <span className="block font-bold">Selecione uma ação</span>
                <span className="block text-gray-500 truncate max-w-32">cliente "{client.name}"</span>
            </Dropdown.Header>

            {client.status === 'ACTIVE' ? (
                <>
                    <Dropdown.Item
                        onClick={() => { setValues(client); openModal() }} >
                        <span className=" flex items-center  text-gray-600">
                            <Pencil strokeWidth={2} className="w-4 h-4 mr-2" />
                            Editar
                        </span>
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                        onClick={() => softDelete(client.id)}>
                        <span className=" flex items-center  text-red-500">
                            <Ban strokeWidth={2} className="w-4 h-4 mr-2" />
                            Desativar
                        </span>
                    </Dropdown.Item>


                </>
            ) : (
                <>
                    <Dropdown.Item
                        onClick={() => restore(client.id)}>

                        <span className=" flex items-center  text-gray-600">
                            <RotateCcw strokeWidth={2} className="w-4 h-4 mr-2" />
                            Restaurar
                        </span>

                    </Dropdown.Item>
                </>
            )}

        </Dropdown>
    )


    return (
        <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full table-auto text-sm text-left text-gray-500">
                <thead className='bg-gray-100'>
                    <tr className="border-b text-[11.7px]  text-gray-600 ">
                        <th className="text-left py-3 px-4">CLIENTE</th>
                        <th className="text-left py-3 px-4">E-MAIL</th>
                        <th className="text-left py-3 px-4">TELEFONE</th>
                        <th className="text-left py-3 px-4">NOTAS</th>
                        <th className="text-left py-3 px-4">BARBEARIA</th>
                        <th className="text-left py-3 px-4">SITUAÇÃO</th>
                        <th className="text-left py-3 px-4">AÇÕES</th>
                    </tr>
                </thead>
                <tbody >
                    {clientsData.map((c) => {
                        const { barbershop, ...client } = c;
                        return (
                            <tr key={client.id} className={`border-b ${client.status === 'INACTIVE' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-gray-600" />
                                        </div>
                                        {client.name}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-600" />
                                        {client.email}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-600" />
                                        {client.phone}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        {client.notes}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        {barbershop.cnpj}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        {client.status === 'INACTIVE' ? 'Inativo' : 'Ativo'}
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <ClientActionsDropdown client={client} />

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ClientTable;