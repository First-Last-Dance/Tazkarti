import axios from "../API/axios";

const createStad = (fetchData, objectData, auth) => {
  if (
    objectData.stadiumName !== undefined &&
    objectData.numberOfRows !== undefined &&
    objectData.numberOfSeatsPerRow !== undefined
  ) {
    fetchData({
      axiosInstance: axios,
      method: "post",
      url: "/stadium/",
      requestConfig: {
        data: objectData,
        headers: {
          //   "Content-Language": "en-US",
          authorization: `Bearer ${auth.getToken()}`,
        },
      },
    });
  }
};

const getStads = (fetchData, auth) => {
  console.log("Enteded front");
  fetchData({
    axiosInstance: axios,
    method: "get",
    url: "/stadium",
    requestConfig: {
      headers: {
        //   "Content-Language": "en-US",
        authorization: `Bearer ${auth.getToken()}`,
      },
    },
  });
};

const isStadNameAvailable = (fetchData, objectData, auth) => {
  console.log("Enteded front");
  fetchData({
    axiosInstance: axios,
    method: "get",
    url: "/stadium/available",
    requestConfig: {
      params: objectData,
      headers: {
        //   "Content-Language": "en-US",
        authorization: `Bearer ${auth.getToken()}`,
      },
    },
  });
};

export { createStad, getStads, isStadNameAvailable };
