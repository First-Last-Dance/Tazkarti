import { CodedError, ErrorCode, ErrorMessage } from '../shared/error';
import User, { UserData } from './model';

export async function getUser(userName: string): Promise<UserData> {
  const user = await User.find({ userName }).exec();
  if (user.length === 0) {
    throw new CodedError(ErrorMessage.UserNotFound, ErrorCode.UserNotFound);
  }
  const userData = {
    userName: user[0].userName,
    firstName: user[0].firstName,
    lastName: user[0].lastName,
    birthDate: user[0].birthDate,
    gender: user[0].gender,
    city: user[0].city,
    email: user[0].email,
    role: user[0].role,
    address: user[0].address,
    admin: user[0].admin,
    authorized: user[0].authorized,
  };
  return userData;
}

export async function getUserpass(userName: string): Promise<string> {
  const password = await User.find({ userName }).select('password');
  if (password.length === 0) {
    throw new CodedError(ErrorMessage.UserNotFound, ErrorCode.UserNotFound);
  }
  return password[0].password;
}

export async function addUser(userData: UserData): Promise<boolean> {
  const user = new User(userData);
  await user.save().catch((err) => {
    throw err;
  });
  return true;
}

export async function checkAvailableUserName(userName: string) {
  return (await User.find({ userName }).exec()).length === 0;
}

export async function isAdmin(userName: string): Promise<boolean> {
  const user = await User.find({ userName })
    .select('admin')
    .catch((err) => {
      throw err;
    });
  if (!user[0].admin) {
    return false;
  }
  return true;
}

export async function isManager(userName: string): Promise<boolean> {
  const user = await User.find({ userName })
    .select('role')
    .catch((err) => {
      throw err;
    });
  if (!(user[0].role == 'manager')) {
    return false;
  }
  return true;
}

export async function authorize(userName: string): Promise<void> {
  const available = await checkAvailableUserName(userName);
  if (available) {
    throw new CodedError(ErrorMessage.UserNotFound, ErrorCode.UserNotFound);
  }
  await User.updateOne({ userName }, { authorized: true }).catch((err) => {
    throw err;
  });
}

export async function deleteUser(userName: string): Promise<void> {
  const available = await checkAvailableUserName(userName);
  if (available) {
    throw new CodedError(ErrorMessage.UserNotFound, ErrorCode.UserNotFound);
  }
  await User.deleteOne({ userName }).catch((err) => {
    throw err;
  });
}

export async function updateUser(
  userName: string,
  firstName?: string,
  lastName?: string,
  birthDate?: Date,
  gender?: string,
  city?: string,
  address?: string,
): Promise<void> {
  const newData: UserData = {};
  if (firstName !== undefined) {
    newData.firstName = firstName;
  }
  if (lastName !== undefined) {
    newData.lastName = lastName;
  }
  if (birthDate !== undefined) {
    newData.birthDate = birthDate;
  }
  if (gender !== undefined) {
    newData.gender = gender;
  }
  if (city !== undefined) {
    newData.city = city;
  }
  if (address !== undefined) {
    newData.address = address;
  }
  await User.updateOne({ userName }, newData).catch((err) => {
    throw err;
  });
}

export async function updatePassword(
  userName: string,
  newPassword: string,
): Promise<void> {
  await User.updateOne({ userName }, { password: newPassword }).catch((err) => {
    throw err;
  });
}

export async function switchRole(userName: string): Promise<void> {
  const available = await checkAvailableUserName(userName);
  if (available) {
    throw new CodedError(ErrorMessage.UserNotFound, ErrorCode.UserNotFound);
  }
  const user = await User.find({ userName: userName });
  if (!user[0].authorized) {
    throw new CodedError(
      ErrorMessage.UserNotAuthorized,
      ErrorCode.UserNotAuthorized,
    );
  }
  if (user[0].role === 'fan') {
    await User.updateOne({ userName }, { role: 'manager' }).catch((err) => {
      throw err;
    });
  } else {
    await User.updateOne({ userName }, { role: 'fan' }).catch((err) => {
      throw err;
    });
  }
}

export async function getAllUsers(authorized: boolean): Promise<UserData[]> {
  const users = await User.find({
    authorized: authorized,
    admin: { $ne: true },
  }).catch((err) => {
    throw err;
  });
  const userDataList: UserData[] = [];
  users.forEach((user) => {
    userDataList.push({
      userName: user.userName,
      role: user.role,
    });
  });
  return userDataList;
}
