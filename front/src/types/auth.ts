export interface AuthError {
    message: string;
    error: {
      email?: string[];
      password?: string[];
    };
  }