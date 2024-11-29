import { Barbershop, Data, TableProps } from "../../../../../types/barbershop";
import { Pencil, Ban, RotateCcw, LayoutDashboard, EllipsisVertical } from "lucide-react";
import { Dropdown } from "flowbite-react";

const BarbershopTable: React.FC<TableProps> = ({ barbershopData, setValues, setOpenModal, softDelete, handleOpenBarberModal, restore }) => {

    const handleEditBarbershop = (shop: Data) => {
        setValues(shop);
        setOpenModal(true);
    };

    const handleDeleteBarbershop = (shopId: number) => {
        softDelete(shopId);
    };


    const BarberActionsDropdown: React.FC<{ shop: Barbershop }> = ({ shop }) => (
        <Dropdown
            className="z-50 absolute"
            arrowIcon={false}
            label={<EllipsisVertical />}
            placement="bottom" inline >
            <Dropdown.Header>
                <span className="block font-bold">Selecione uma ação</span>
                <span className="block text-gray-500 truncate max-w-32">empresa "{shop.tradeName}"</span>
            </Dropdown.Header>

            {shop.status === 'ACTIVE' ? (
                <>
                    <Dropdown.Item
                        onClick={() => handleEditBarbershop(shop)} >
                        <span className=" flex items-center  text-gray-600">
                            <Pencil strokeWidth={2} className="w-4 h-4 mr-2" />
                            Editar
                        </span>
                    </Dropdown.Item>


                    <Dropdown.Item
                        onClick={() => handleOpenBarberModal(shop.id)}>

                        <span className=" flex items-center  text-gray-600">
                            <LayoutDashboard strokeWidth={2} className="w-4 h-4 mr-2" />
                            Barbeiros
                        </span>

                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                        onClick={() => handleDeleteBarbershop(shop.id)}>
                        <span className=" flex items-center  text-red-500">
                            <Ban strokeWidth={2} className="w-4 h-4 mr-2" />
                            Desativar
                        </span>
                    </Dropdown.Item>


                </>
            ) : (
                <>
                    <Dropdown.Item
                        onClick={() => restore(shop.id)}>

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
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-3 text-gray-600 font-bold">Razão Social</th>
                    <th className="px-4 py-3 text-gray-600">Nome Fantasia</th>
                    <th className="px-4 py-3 text-gray-600">CNPJ</th>
                    <th className="px-4 py-3 text-gray-600">Endereço</th>
                    <th className="px-4 py-3 text-gray-600">Telefone</th>
                    <th className="px-4 py-3 text-gray-600">Situação</th>
                    <th className="px-4 py-3 text-gray-600">Ação</th>
                </tr>
            </thead>
            <tbody>
                {barbershopData.map((shop) => (
                    <tr
                        key={shop.id}
                        className={`border-b ${shop.status === 'INACTIVE' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                    >
                        <td className="px-4 py-3 truncate max-w-44 font-bold">{shop.socialReason}</td>
                        <td className="px-4 py-3 truncate max-w-44">{shop.tradeName}</td>
                        <td className="px-4 py-3 truncate max-w-44">{shop.cnpj}</td>
                        <td className="px-4 py-3 truncate max-w-44">{shop.address}</td>
                        <td className="px-4 py-3 truncate max-w-44">{shop.phoneNumber}</td>
                        <td className="px-4 py-3">{shop.status === 'INACTIVE' ? 'Inativo' : 'Ativo'}</td>
                        <td className="px-4 py-3">
                            <div className="flex space-x-2">
                                <BarberActionsDropdown shop={shop} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BarbershopTable;

