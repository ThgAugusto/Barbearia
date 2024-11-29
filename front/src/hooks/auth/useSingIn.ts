import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import AuthServices from '../../services/auth/authServices';
import { signInValidationSchema } from '../../schemas/signInValidationSchema';
import { SignInFormData } from '../../types/auth';
import { useAuth } from '../../context/AuthProvider';

export const useSignIn = () => {
  const navigate = useNavigate();
  const authService = AuthServices();
  const { login } = useAuth();
  const handleSignIn = async (
    values: SignInFormData,
    { setErrors }: FormikHelpers<SignInFormData>
  ) => {
    try {
      const response = await authService.authenticate(values.email, values.password);
      if (response.success) {
        login(response.data);
        navigate('/dashboard');
      }
    } catch (error: unknown) {
      handleSignInError(error, setErrors);
    }

  };

  const handleSignInError = (error: unknown, setErrors: FormikHelpers<SignInFormData>['setErrors']) => {
    if (error instanceof AxiosError) {
      setErrors(error.response?.data?.message);
    } else {
      console.error('Erro inesperado:', error);
    }
  };

  return {
    signInValidationSchema,
    handleSignIn,
  };
};
