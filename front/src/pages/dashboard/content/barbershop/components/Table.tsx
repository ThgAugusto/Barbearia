import { Barbershop, TableProps } from "../../../../../types/barbershop";
import { Pencil, Ban, RotateCcw, EllipsisVertical, LayoutList } from "lucide-react";
import { Dropdown } from "flowbite-react";

const BarbershopTable: React.FC<TableProps> = ({ barbershopsData, setValues, openModal, softDelete, openTreatmentModal, restore }) => {

    const BarberActionsDropdown: React.FC<{ shop: Barbershop }> = ({ shop }) => (
        <Dropdown
            className="z-50 absolute"
            arrowIcon={false}
            label={<EllipsisVertical className="w-5 h-5" />}
            placement="bottom" inline >
            <Dropdown.Header>
                <span className="block font-bold">Selecione uma ação</span>
                <span className="block text-gray-500 truncate max-w-32">empresa "{shop.tradeName}"</span>
            </Dropdown.Header>

            {shop.status === 'ACTIVE' ? (
                <>
                    <Dropdown.Item
                        onClick={() => {setValues(shop); openModal();}} >
                        <span className=" flex items-center  text-gray-600">
                            <Pencil strokeWidth={2} className="w-4 h-4 mr-2" />
                            Editar
                        </span>
                    </Dropdown.Item>


                    <Dropdown.Item
                        onClick={() => openTreatmentModal(shop.id)}>

                        <span className=" flex items-center  text-gray-600">
                            <LayoutList strokeWidth={2} className="w-4 h-4 mr-2" />
                            Serviços
                        </span>

                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                        onClick={() =>  softDelete(shop.id)}>
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
        <div className="overflow-x-auto rounded-t-xl">
            <table className="min-w-full table-auto text-sm text-left text-gray-500 ">
                <thead className="bg-gray-100">
                    <tr className="text-[11.7px]  text-gray-600">
                        <th className="px-4 py-3 font-bold">RAZÃO SOCIAL</th>
                        <th className="px-4 py-3">NOME FANTASIA</th>
                        <th className="px-4 py-3">CNPJ</th>
                        <th className="px-4 py-3">ENDEREÇO</th>
                        <th className="px-4 py-3">TELEFONE</th>
                        <th className="px-4 py-3">SITUAÇÃO</th>
                        <th className="px-4 py-3">AÇÃO</th>

                    </tr>
                </thead>
                <tbody>
                    {barbershopsData.map((shop) => (
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
        </div>
    );
}

export default BarbershopTable;

