import { AxiosError } from "axios";
import { DataStepOne, DataStepTwo } from "../../types/owner";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import OwnerService from "../../services/ownerService";

const useOwner = () => {
    const ownerService = OwnerService();
    const navigate = useNavigate();

    const create = async (
        combinedValues: DataStepOne & DataStepTwo,
        helpersStepOne: FormikHelpers<DataStepOne>,
        helpersStepTwo: FormikHelpers<DataStepTwo>,
        setStep: React.Dispatch<React.SetStateAction<number>>
    ) => {
        try {
            const response = await ownerService.create({
                user: {
                    name: combinedValues.name,
                    email: combinedValues.email,
                    password: combinedValues.password,
                    cpf: combinedValues.cpf,
                },
                phoneNumber: combinedValues.phoneNumber,
            });

            if (response) {
                navigate("/sign-in", { state: { email: response.user.email } });
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const errors = error.response?.data?.message;

                if (errors) {
                    const stepOneFields = ['name', 'email', 'phoneNumber'];
                    const stepTwoFields = ['cpf', 'password', 'confirmPassword'];

                    const stepOneErrors = Object.fromEntries(
                        Object.entries(errors).filter(([key]) => stepOneFields.includes(key))
                    );
                    const stepTwoErrors = Object.fromEntries(
                        Object.entries(errors).filter(([key]) => stepTwoFields.includes(key))
                    );

                    if (Object.keys(stepOneErrors).length > 0) {
                        helpersStepOne.setErrors(stepOneErrors);
                        setStep(1);
                    }

                    if (Object.keys(stepTwoErrors).length > 0) {
                        helpersStepTwo.setErrors(stepTwoErrors);
                        setStep(2);
                    }
                }
            } else {
                console.error('Erro inesperado:', error);
            }
        }
    };

    return { create };
};

export default useOwner;
