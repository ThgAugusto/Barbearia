import { useField, ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";
import { Label, TextInput as FlowbiteInput } from "flowbite-react";
import { AlertCircle } from "lucide-react";

interface TextInputProps {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ label, icon: Icon, disabled, ...props }) => {
    const [field, meta] = useField(props);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    useEffect(() => {
        const inputElement = document.getElementById(field.name) as HTMLInputElement;
        if (meta.error && meta.touched && inputElement) {
            inputElement.focus();
        }
    }, [meta.error, meta.touched, field.name]);

    const RightIcon = () => {
        if (meta.error && meta.touched) {
            return <AlertCircle className="w-5 h-5 text-red-500" />;
        }
        return null;
    };

    return (
        <div className="mb-4">
            <Label htmlFor={field.name} className="mb-2">
                {label}
            </Label>
            <Field
                as={FlowbiteInput}
                id={field.name}
                {...field}
                {...props}
                icon={Icon}
                rightIcon={RightIcon}
                color={meta.error && meta.touched ? "failure" : undefined}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
            />
            {isFocused && meta.error && (
                <ErrorMessage name={field.name} component="div" className="text-red-500 text-[13px]" />
            )}
        </div>
    );
};

export default TextInput;
