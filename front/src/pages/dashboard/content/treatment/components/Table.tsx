import React from 'react';
import { Clock, DollarSign, EllipsisVertical, Pencil, Ban, RotateCcw, Scissors } from 'lucide-react';
import { Treatment, Data, TableProps } from '../../../../../types/treatment';
import { Button, Dropdown } from 'flowbite-react';

const TreatmentTable: React.FC<TableProps> = ({
  treatmentData,
  softDelete,
  restore,
  setShowForm,
  setValues
}) => {
  const handleEditTreatment = (treatment: Data) => {
    setValues(treatment);
    setShowForm(true);
  };

  const handleDeleteTreatment = (treatmentId: number) => {
    softDelete(treatmentId);
  };

  const TreatmentActionsDropdown: React.FC<{ treatment: Treatment }> = ({ treatment }) => (
    <Dropdown
      className="z-50 absolute"
      arrowIcon={false}
      label={<EllipsisVertical className="w-5 h-5" />}
      placement="bottom"
      inline
    >
      <Dropdown.Header>
        <span className="block font-bold">Selecione uma ação</span>
        <span className="block text-gray-500 truncate max-w-32">tratamento "{treatment.name}"</span>
      </Dropdown.Header>

      {treatment.status === 'ACTIVE' ? (
        <>
          <Dropdown.Item onClick={() => handleEditTreatment(treatment)}>
            <span className="flex items-center text-gray-600">
              <Pencil strokeWidth={2} className="w-4 h-4 mr-2" />
              Editar
            </span>
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item onClick={() => handleDeleteTreatment(treatment.id)}>
            <span className="flex items-center text-red-500">
              <Ban strokeWidth={2} className="w-4 h-4 mr-2" />
              Desativar
            </span>
          </Dropdown.Item>
        </>
      ) : (
        <>
          <Dropdown.Item onClick={() => restore(treatment.id)}>
            <span className="flex items-center text-gray-600">
              <RotateCcw strokeWidth={2} className="w-4 h-4 mr-2" />
              Restaurar
            </span>
          </Dropdown.Item>
        </>
      )}
    </Dropdown>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Serviços</h2>
        <Button className="bg-cyan-900 rounded-3xl" onClick={() => setShowForm(true)}>
          <span className="flex items-center">
            <Scissors className="w-4 h-4 mr-2" /> Novo Serviço
          </span>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-t-xl max-h-[358px] overflow-y-auto">
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
          <thead className="bg-gray-100">
            <tr className="text-[11.7px] text-gray-600">
              <th className="px-4 py-3 font-bold">NOME DO SERVIÇO</th>
              <th className="px-4 py-3">DESCRIÇÃO</th>
              <th className="px-4 py-3">PREÇO</th>
              <th className="px-4 py-3">DURAÇÃO</th>
              <th className="px-4 py-3">SITUAÇÃO</th>
              <th className="px-4 py-3">AÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {treatmentData.map((treatment) => (
              <tr
                key={treatment.id}
                className={`border-b ${treatment.status === 'INACTIVE' ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
              >
                <td className="px-4 py-3 truncate max-w-44 font-bold">{treatment.name}</td>
                <td className="px-4 py-3 truncate max-w-44">{treatment.description}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-gray-700">
                    <DollarSign className="w-4 h-4" />
                    <span>R$ {treatment.price}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-gray-700">
                    <Clock className="w-4 h-4" />
                    <span>{treatment.duration} min</span>
                  </div>
                </td>
                <td className="px-4 py-3">{treatment.status === 'INACTIVE' ? 'Inativo' : 'Ativo'}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <TreatmentActionsDropdown treatment={treatment} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreatmentTable;
