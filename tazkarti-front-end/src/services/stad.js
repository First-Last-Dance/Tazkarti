import axios from "../API/axios";

const createStad = (fetchData, objectData, auth) => {
  if (
    objectData.stadiumName !== undefined &&
    objectData.numberOfRows !== undefined &&
    objectData.numberOfSeatsPerRow !== undefined
  ) {
    console.log("Enteded front")
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

export { createStad };
