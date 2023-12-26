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

const getUserData = (fetchData, auth) => {
  console.log(auth.getToken())
  if (!auth || !auth.isLoggedIn() || !auth.getToken()) return;
  fetchData({
    axiosInstance: axios,
    method: "get",
    url: "/user",
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
        authorization: `Bearer ${auth.getToken()}`,
      },
    },
  });
};

const editUserData = (fetchData, auth, objectData) => {
  if (!auth || !auth.isLoggedIn() || !auth.getToken()) return;
  fetchData({
    axiosInstance: axios,
    method: "put",
    url: "/user",
    requestConfig: {
      data: objectData,
      headers: {
        "Content-Language": "en-US",
        authorization: `Bearer ${auth.getToken()}`,
      },
    },
  });
};


const isUserNameAvailable = (fetchData, objectData) => {
  fetchData({
    axiosInstance: axios,
    method: "get",
    url: "/user/available?userName",
    requestConfig: {
      params: objectData,
      headers: {
        //   "Content-Language": "en-US",
      
      },
    },
  });
};

export { signUp, logIn, getUserData, editUserData, isUserNameAvailable };
