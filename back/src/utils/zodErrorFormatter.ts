import { ZodError } from 'zod';

interface FormattedErrors {
  [key: string]: string | string[]; 
}

const formatZodErrors = (error: ZodError): FormattedErrors => {
  const formattedErrors: FormattedErrors = {};

  error.errors.forEach((err) => {
    const key = err.path[0];
    const message = err.message;

    if (formattedErrors[key]) {
      if (Array.isArray(formattedErrors[key])) {
        formattedErrors[key].push(message);
      } else {
        formattedErrors[key] = [formattedErrors[key] as string, message];
      }
    } else {
      formattedErrors[key] = message;
    }
  });

  return formattedErrors;
};

export default formatZodErrors;
