import { Barber, TableProps } from "../../../../../types/barber";
import { Ban, EllipsisVertical, Pencil, RotateCcw } from "lucide-react";
import { Dropdown } from "flowbite-react";

const BarberTable: React.FC<TableProps> = ({ barberData, setValues, setShowForm, softDelete, restore }) => {

    const BarberActionsDropdown: React.FC<{ barber: Barber }> = ({ barber }) => (
        <Dropdown
            className="z-50 absolute"
            arrowIcon={false}
            label={<EllipsisVertical />}
            placement="bottom" inline >

            <Dropdown.Header>
                <span className="block font-bold">Selecione uma ação</span>
                <span className="block text-gray-500 truncate max-w-32">{barber.name}</span>
            </Dropdown.Header>

            {barber.status === 'ACTIVE' ? (
                <>
                    <Dropdown.Item
                        onClick={() => { setShowForm(true); setValues(barber) }}>
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
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
            <thead className="bg-gray-100 ">
                <tr>
                    <th className="px-4 py-3 text-gray-600 font-bold">Nome</th>
                    <th className="px-4 py-3 text-gray-600">Email</th>
                    <th className="px-4 py-3 text-gray-600">Situação</th>
                    <th className="px-4 py-3 text-gray-600">Ação</th>
                </tr>
            </thead>

            <tbody>
                {barberData.map((barber) => (
                    <tr
                        key={barber.id}
                        className={`border-b ${barber.status === 'INACTIVE' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                    >
                        <td className="px-4 py-3 truncate max-w-44 font-bold">{barber.name}</td>
                        <td className="px-4 py-3 truncate max-w-44">{barber.email}</td>
                        <td className="px-4 py-3">{barber.status === 'INACTIVE' ? 'Inativo' : 'Ativo'}</td>
                        <td className="px-4 py-3">
                            <div className="flex space-x-2">
                                <BarberActionsDropdown barber={barber} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BarberTable;
