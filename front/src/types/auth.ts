export interface SignInFormData {
  email: string;
  password: string;
}

export interface DecodedToken {
  userId: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: DecodedToken | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}