import { useState } from "react";
import AuthServices from "../../services/auth/authService";
import { AxiosError } from 'axios';
import { AuthError } from "../../types/auth";

export const useLoginForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<AuthError | null>(null);

    const authService = AuthServices();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await authService.authenticate(email, password);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setError(error.response?.data);
            } else {
                console.error(error)
            }
        }
    }

    return { email, setEmail, password, setPassword, handleSubmit, error };
}
