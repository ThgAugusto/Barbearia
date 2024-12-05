import { Field, ErrorMessage, useField } from "formik";
import { AlertCircle } from "lucide-react";

type Option = {
  value: string | number;
  label: string;
};

interface SelectFormikProps {
  name: string;
  label: string;
  options: Option[];
  disabled?: boolean;
}

const SelectFormik: React.FC<SelectFormikProps> = ({ label, options, name, disabled }) => {
  const [field, meta] = useField(name);

  const RightIcon = () => {
    if (meta.error && meta.touched) {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="mb-4">
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
        {label}
      </label>
      <Field
        as="select"
        id={field.name}
        {...field} 
        className={`block w-full p-2.5 text-sm text-gray-700 border rounded-lg bg-gray-50 focus:ring-cyan-500 focus:border-cyan-500 
          ${meta.error && meta.touched ? "border-red-500 bg-red-50" : "border-gray-300"}
          dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500`}
        disabled={disabled}
      > 
        <option value="" >Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      {meta.error && meta.touched && (
        <div className="flex items-center text-sm text-red-500 mt-1">
          <RightIcon />
          <ErrorMessage name={field.name} component="div" className="ml-1" />
        </div>
      )}
    </div>
  );
};

export default SelectFormik;
