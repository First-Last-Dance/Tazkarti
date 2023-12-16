import axios from "../API/axios";

const getWaitingUsers = (fetchData, auth) => {
  fetchData({
    axiosInstance: axios,
    method: "get",
    url: "/user/unauthorized",
    requestConfig: {
      data: {},
      headers: {
        "Content-Language": "en-US",
        authorization: `Bearer ${auth.getToken()}`,
      },
    },
  });
};

const getApprovedUsers = (fetchData, auth) => {
  fetchData({
    axiosInstance: axios,
    method: "get",
    url: "/user/authorized",
    requestConfig: {
      data: {},
      headers: {
        "Content-Language": "en-US",
        authorization: `Bearer ${auth.getToken()}`,
      },
    },
  });
};

const approveUser = (fetchData, objectData, auth) => {
  fetchData({
    axiosInstance: axios,
    method: "patch",
    url: "/user/authorize",
    requestConfig: {
      data: objectData,
      headers: {
        "Content-Language": "en-US",
        authorization: `Bearer ${auth.getToken()}`,
      },
    },
  });
};

const removeUser = (fetchData, objectData, auth) => {
  fetchData({
    axiosInstance: axios,
    method: "delete",
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

const switchRole = (fetchData, objectData, auth) => {
  fetchData({
    axiosInstance: axios,
    method: "patch",
    url: "/user/switchRole",
    requestConfig: {
      data: objectData,
      headers: {
        "Content-Language": "en-US",
        authorization: `Bearer ${auth.getToken()}`,
      },
    },
  });
};

export {
  getWaitingUsers,
  getApprovedUsers,
  approveUser,
  removeUser,
  switchRole,
};
