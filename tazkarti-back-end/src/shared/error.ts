export class CodedError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
// message enum
export enum ErrorMessage {
  UserNotFound = 'User was not found',
  UserAlreadyExist = 'User already exist',
  invalidBirthDate = 'Invalid birthDate',
  invalidGender = 'Invalid gender',
  invalidRole = 'Invalid role',
  invalidEmail = 'Invalid Email',
  wrongPassword = 'Wrong password',
  UserAlreadyAuthorized = 'User already authorized',
  UserNotAuthorized = 'User not authorized',
}

// code enums
export enum ErrorCode {
  UserNotFound = 400,
  invalidParameter = 400,
  missingparameter = 400,
  authenticationError = 401,
  AlreadyExist = 400,
  UserAlreadyAuthorized = 400,
  UserNotAuthorized = 400,
}
