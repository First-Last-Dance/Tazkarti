import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as EmailValidator from 'email-validator';
import bcrypt from 'bcryptjs';
import * as User from './service';
import { UserData } from './model';
import { CodedError, ErrorCode, ErrorMessage } from '../shared/error';

export async function generatePassword(
  plainTextPassword: string,
): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(plainTextPassword, salt);
}

async function comparePasswords(
  plainTextPassword: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hash);
}

function generateJWT(userName: string): string {
  dotenv.config();
  return jwt.sign(
    { userName },
    process.env.JWT_SECRET as unknown as jwt.Secret,
  );
}
function isDateString(input: string): boolean {
  // Regular expression for a simple date format (YYYY-MM-DD)
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the input string matches the date format
  if (!dateFormatRegex.test(input)) {
    return false;
  }

  // Parse the input string as a Date object and check if it's a valid date
  const parsedDate = new Date(input);
  return !Number.isNaN(parsedDate.getTime());
}

export async function signUp(
  userName: string,
  password: string,
  firstName: string,
  lastName: string,
  birthDate: string,
  gender: string,
  city: string,
  email: string,
  role: string,
  address?: string,
): Promise<string> {
  const vaildUser = await User.checkAvailableUserName(userName);
  if (!vaildUser) {
    throw new CodedError(ErrorMessage.UserAlreadyExist, ErrorCode.AlreadyExist);
  }
  if (!email || !EmailValidator.validate(email)) {
    throw new CodedError(ErrorMessage.invalidEmail, ErrorCode.invalidParameter);
  }
  if (!isDateString(birthDate)) {
    throw new CodedError(
      ErrorMessage.invalidBirthDate,
      ErrorCode.invalidParameter,
    );
  }
  if (gender !== 'male') {
    if (gender !== 'female') {
      throw new CodedError(
        ErrorMessage.invalidGender,
        ErrorCode.invalidParameter,
      );
    }
  }
  if (role !== 'fan') {
    if (role !== 'manager') {
      throw new CodedError(
        ErrorMessage.invalidRole,
        ErrorCode.invalidParameter,
      );
    }
  }
  const generatedHash = await generatePassword(password);
  const parsedDate = new Date(birthDate);
  const userData: UserData = {};
  userData.userName = userName;
  userData.password = generatedHash;
  userData.firstName = firstName;
  userData.lastName = lastName;
  userData.birthDate = parsedDate;
  userData.gender = gender;
  userData.city = city;
  userData.email = email;
  userData.role = role;
  userData.authorized = false;
  if (address !== undefined) {
    userData.address = address;
  }
  await User.addUser(userData).catch((err) => {
    throw err;
  });
  return generateJWT(userName);
}

export async function signIn(userName: string, password: string) {
  const pass = await User.getUserpass(userName).catch((err) => {
    throw err;
  });
  const authValid = await comparePasswords(password, pass);

  if (!authValid) {
    throw new CodedError(
      ErrorMessage.wrongPassword,
      ErrorCode.authenticationError,
    );
  }
  return generateJWT(userName);
}

export async function getUser(userName: string): Promise<UserData> {
  const user = await User.getUser(userName).catch((err) => {
    throw err;
  });
  return user;
}

export async function authorize(userName: string): Promise<void> {
  const user = await User.getUser(userName).catch((err) => {
    throw err;
  });
  if (user.authorized === true) {
    throw new CodedError(
      ErrorMessage.UserAlreadyAuthorized,
      ErrorCode.UserAlreadyAuthorized,
    );
  }
  await User.authorize(userName);
}

export async function deleteUser(userName: string): Promise<void> {
  await User.deleteUser(userName).catch((err) => {
    throw err;
  });
}
export async function updateUser(
  userName: string,
  firstName: string,
  lastName: string,
  birthDate: string,
  gender: string,
  city: string,
  address?: string,
): Promise<void> {
  let parsedDate: Date = new Date();
  if (birthDate !== undefined) {
    if (!isDateString(birthDate)) {
      throw new CodedError(
        ErrorMessage.invalidBirthDate,
        ErrorCode.invalidParameter,
      );
    }
    parsedDate = new Date(birthDate);
  } else {
    parsedDate = birthDate;
  }
  if (gender !== undefined && gender !== 'male') {
    if (gender !== 'female') {
      throw new CodedError(
        ErrorMessage.invalidGender,
        ErrorCode.invalidParameter,
      );
    }
  }
  await User.updateUser(
    userName,
    firstName,
    lastName,
    parsedDate,
    gender,
    city,
    address,
  ).catch((err) => {
    throw err;
  });
}

export async function updatePassword(
  userName: string,
  password: string,
  newPassword: string,
): Promise<void> {
  const pass = await User.getUserpass(userName).catch((err) => {
    throw err;
  });
  const authValid = await comparePasswords(password, pass);

  if (!authValid) {
    throw new CodedError(
      ErrorMessage.wrongPassword,
      ErrorCode.authenticationError,
    );
  }
  const generatedHash = await generatePassword(newPassword);
  User.updatePassword(userName, generatedHash);
}

export async function getAllUnauthorized(): Promise<UserData[]> {
  return User.getAllUsers(false);
}
export async function getAllauthorized(): Promise<UserData[]> {
  return User.getAllUsers(true);
}

export async function switchRole(userName: string): Promise<void> {
  await User.switchRole(userName);
}
