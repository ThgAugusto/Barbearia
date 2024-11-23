export class CustomError extends Error {
  statusCode: number;
  details?: any;  

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.statusCode = statusCode;

    if (details) {
      this.details = details;
    }

    Object.setPrototypeOf(this, new.target.prototype);
  }
}