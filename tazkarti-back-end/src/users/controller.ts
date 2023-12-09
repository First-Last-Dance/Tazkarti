import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as EmailValidator from 'email-validator';
import * as User from './service';
import bcrypt from 'bcryptjs';
import { UserData } from './model';

async function generatePassword(plainTextPassword: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
}

async function comparePasswords(
  plainTextPassword: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hash);
}

function generateJWT(userName: string): string {
  dotenv.config();
  return jwt.sign(
    { userName: userName },
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
  return !isNaN(parsedDate.getTime());
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
    throw 'user already exists';
  }
  if (!email || !EmailValidator.validate(email)) {
    throw 'invalid email';
  }
  if (!isDateString(birthDate)) {
    throw 'invalid birthDate';
  }
  if (gender != 'male') {
    if (gender != 'female') throw 'invalid gender';
  }
  if (role != 'fan') {
    if (role != 'manager') throw 'invalid role';
  }
  const generatedHash = await generatePassword(password);
  let flag = false;
  const parsedDate = new Date(birthDate);
  if (address != undefined) {
    flag = await User.addUser(
      userName,
      generatedHash,
      firstName,
      lastName,
      parsedDate,
      gender,
      city,
      email,
      role,
      address,
    );
  } else {
    flag = await User.addUser(
      userName,
      generatedHash,
      firstName,
      lastName,
      parsedDate,
      gender,
      city,
      email,
      role,
    );
  }
  if (flag) {
    const jwt = generateJWT(userName);
    return jwt;
  } else {
    throw 'Failed to add to DB';
  }
}

export async function signIn(userName: string, password: string) {
  const pass = await User.getUserpass(userName).catch((err) => {
    throw err;
  });
  const authValid = await comparePasswords(password, pass);

  if (!authValid) {
    throw 'invalid password';
  }
  const jwt = generateJWT(userName);
  return jwt;
}

export async function getUser(userName: string): Promise<UserData> {
  const user = await User.getUser(userName).catch((err) => {
    throw err;
  });
  return user;
}

export async function authorize(userName: string): Promise<boolean> {
  const user = await User.getUser(userName).catch((err) => {
    throw err;
  });
  if (user.role != 'manager') {
    throw 'user must be manager';
  }
  if (user.authorized == true) {
    throw 'user is already authorized';
  }
  return User.authorize(userName);
}
