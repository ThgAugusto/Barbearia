import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/auth";


export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};
