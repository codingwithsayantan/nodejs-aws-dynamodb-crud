class CustomError extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
