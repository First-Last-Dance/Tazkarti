import axios from "../API/axios";

const createMatch = (fetchData, objectData, auth) => {
  if (
    objectData.homeTeam !== undefined &&
    objectData.awayTeam !== undefined &&
    objectData.matchVenue !== undefined &&
    objectData.date !== undefined &&
    objectData.time !== undefined &&
    objectData.mainReferee !== undefined &&
    objectData.firstLinesman !== undefined &&
    objectData.secondLinesman !== undefined
  ) {
    fetchData({
      axiosInstance: axios,
      method: "post",
      url: "/match/",
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

const getAllMatches = (fetchData, auth) => {
  fetchData({
    axiosInstance: axios,
    method: "get",
    url: "/match/",
    requestConfig: {
      headers: {
        //   "Content-Language": "en-US",
        authorization: `Bearer ${auth.getToken()}`,
      },
    },
  });
};

export { createMatch, getAllMatches };
