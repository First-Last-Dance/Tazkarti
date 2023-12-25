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
  InvalidBirthDate = 'Invalid birthDate',
  InvalidGender = 'Invalid gender',
  InvalidRole = 'Invalid role',
  InvalidEmail = 'Invalid Email',
  WrongPassword = 'Wrong password',
  UserAlreadyAuthorized = 'User already authorized',
  UserNotAuthorized = 'User not authorized',
  StadiumNotFound = 'Stadium not found',
  StadiumAlreadyExist = 'Stadium already exist',
  InvalidNumberOfRows = 'Number of rows must be greater than zero',
  InvalidNumberOfSeatsPerRow = 'Number of seats per row must be greater than zero',
}

// code enums
export enum ErrorCode {
  UserNotFound = 400,
  InvalidParameter = 400,
  Missingparameter = 400,
  AuthenticationError = 401,
  AlreadyExist = 400,
  UserAlreadyAuthorized = 400,
  UserNotAuthorized = 400,
  StadiumNotFound = 400,
  StadiumAlreadyExist = 400,
}
