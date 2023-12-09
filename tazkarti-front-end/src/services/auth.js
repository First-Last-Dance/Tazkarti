import axios from "../API/axios";

const signUp = (fetchData, objectData) => {
  if (
    objectData.userName !== undefined &&
    objectData.password !== undefined &&
    objectData.firstName !== undefined &&
    objectData.lastName !== undefined &&
    objectData.birthDate !== undefined &&
    objectData.gender !== undefined &&
    objectData.city !== undefined &&
    objectData.email !== undefined &&
    objectData.role !== undefined
  ) {
    fetchData({
      axiosInstance: axios,
      method: "post",
      url: "/user/signUp",
      requestConfig: {
        data: objectData,
        headers: {
          "Content-Language": "en-US",
        },
      },
    });
  }
};

const logIn = (fetchData, objectData) => {
  if (objectData.userName !== undefined && objectData.password !== undefined) {
    fetchData({
      axiosInstance: axios,
      method: "post",
      url: "/user/signIn",
      requestConfig: {
        data: objectData,
        headers: {
          "Content-Language": "en-US",
        },
      },
    });
  }
};

export { signUp, logIn };
