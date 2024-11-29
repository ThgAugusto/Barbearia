import { ZodError } from "zod";
import formatZodErrors from "../utils/zodErrorFormatter";

export class CustomError extends Error {
  statusCode: number;
  msg: any;

  constructor(msg: any, statusCode: number) {
    super(); 
    this.msg = msg;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  toString(): string {
    if (this.msg && typeof this.msg === 'object') {
      return JSON.stringify(this.msg);
    }
    return String(this.msg);
  }
}

export class ValidationError extends CustomError {
  constructor(error: ZodError) {
    const formattedErrors = formatZodErrors(error);  
    super(formattedErrors, 400);  
  }
}