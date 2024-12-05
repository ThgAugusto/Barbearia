import { Barber, TableProps } from "../../../../../types/barber";
import { Ban, EllipsisVertical, Pencil, RotateCcw } from "lucide-react";
import { Dropdown } from "flowbite-react";

const BarberTable: React.FC<TableProps> = ({ barbersData, setValues, openModal, softDelete, restore }) => {

    const BarberActionsDropdown: React.FC<{ barber: Barber }> = ({ barber }) => (
        <Dropdown
            className="z-50 absolute"
            arrowIcon={false}
            label={<EllipsisVertical className='w-5 h-5' />}
            placement="bottom" inline >
            <Dropdown.Header>
                <span className="block font-bold">Selecione uma ação</span>
                <span className="block text-gray-500 truncate max-w-32">{barber.user.name}</span>
            </Dropdown.Header>

            {barber.user.status === 'ACTIVE' ? (
                <>
                    <Dropdown.Item
                        onClick={() => { openModal(); setValues({
                            ...barber.user,        
                            barbershopId: barber.barbershopId,
                            id: barber.id          
                        }); }}>
                        <span className="flex items-center text-gray-600">
                            <Pencil strokeWidth={2} className="w-4 h-4 mr-2" />
                            Editar
                        </span>
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                        onClick={() => softDelete(barber.id)}>
                        <span className="flex items-center text-red-500">
                            <Ban strokeWidth={2} className="w-4 h-4 mr-2" />
                            Desativar
                        </span>
                    </Dropdown.Item>
                </>
            ) : (
                <>
                    <Dropdown.Item
                        onClick={() => restore(barber.id)}>
                        <span className=" flex items-center  text-gray-600">
                            <RotateCcw strokeWidth={2} className="w-4 h-4 mr-2" />
                            Restaurar
                        </span>
                    </Dropdown.Item>
                </>
            )}
        </Dropdown>
    );

    return (
        <div className="overflow-x-auto rounded-t-xl">
            <table className="min-w-full table-auto text-sm text-left text-gray-500">
                <thead className="bg-gray-100 ">
                    <tr className="text-gray-600 text-[11.7px]">
                        <th className="px-4 py-3  font-bold">NOME</th>
                        <th className="px-4 py-3">E-MAIL</th>
                        <th className="px-4 py-3">BARBEARIA</th>
                        <th className="px-4 py-3">CNPJ BARBEARIA</th>
                        <th className="px-4 py-3">SITUAÇÃO</th>
                        <th className="px-4 py-3">AÇÃO</th>
                    </tr>
                </thead>

                <tbody>
                    {barbersData.map((barber) => (
                        <tr
                            key={barber.id}
                            className={`border-b ${barber.user.status === 'INACTIVE' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                        >
                            <td className="px-4 py-3 truncate max-w-44 font-bold">{barber.user.name}</td>
                            <td className="px-4 py-3 truncate max-w-44">{barber.user.email}</td>
                            <td className="px-4 py-3 truncate max-w-44">{barber.barbershop.socialReason}</td>
                            <td className="px-4 py-3 truncate max-w-44">{barber.barbershop.cnpj}</td>
                            <td className="px-4 py-3">{barber.user.status === 'INACTIVE' ? 'Inativo' : 'Ativo'}</td>
                            <td className="px-4 py-3">
                                <div className="flex space-x-2">
                                    <BarberActionsDropdown barber={barber} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BarberTable;
