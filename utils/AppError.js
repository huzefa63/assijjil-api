class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Pass message to the parent Error class

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // Mark as a trusted, operational error

    // Capture stack trace, excluding this constructor from it
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
