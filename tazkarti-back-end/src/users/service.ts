import User, { UserData } from './model';

export async function getUser(userName: string): Promise<UserData> {
  const user = await User.find({ userName: userName }).exec();
  if (user.length == 0) {
    throw 'user not found';
  }
  const userData = {
    userName: user[0].userName,
    password: '',
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
  const password = await User.find({ userName: userName }).select('password');
  if (password.length == 0) {
    throw 'user not found';
  }
  return password[0].password;
}

export async function addUser(
  userName: string,
  password: string,
  firstName: string,
  lastName: string,
  birthDate: Date,
  gender: string,
  city: string,
  email: string,
  role: string,
  address?: string,
): Promise<boolean> {
  const userData = {
    userName: userName,
    password: password,
    firstName: firstName,
    lastName: lastName,
    birthDate: birthDate,
    gender: gender,
    city: city,
    email: email,
    role: role,
    admin: false,
    authorized: false,
    address: address != undefined ? address : 'unavailable',
  };
  const user = new User(userData);
  await user.save().catch((err) => {
    throw err;
  });
  return true;
}

export async function checkAvailableUserName(userName: string) {
  return (await User.find({ userName: userName }).exec()).length == 0;
}

export async function isAdmin(userName: string): Promise<boolean> {
  const user = await User.find({ userName: userName })
    .select('admin')
    .catch((err) => {
      throw err;
    });
  if (!user[0].admin) {
    return false;
  } else {
    return true;
  }
}

export async function authorize(userName: string): Promise<boolean> {
  await User.updateOne({ userName: userName }, { authorized: true }).catch(
    (err) => {
      throw err;
    },
  );
  return true;
}
