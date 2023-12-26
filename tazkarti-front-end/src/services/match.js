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

const getMatch = (fetchData, objectData, auth) => {
  fetchData({
    axiosInstance: axios,
    method: "get",
    url: `/match/${objectData.matchID}`,
    requestConfig: {
      headers: {
        params: objectData,
        //   "Content-Language": "en-US",
        authorization: `Bearer ${auth.getToken()}`,
      },
    },
  });
};

const EditMatchFunc = (fetchData, objectData, auth) => {
  console.log("objectdata");
  if (
    objectData.matchID !== undefined &&
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
      method: "patch",
      url: "/match",
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

const deleteMatch = (fetchData, objectData, auth) => {
  if (objectData.matchID !== undefined) {
    fetchData({
      axiosInstance: axios,
      method: "delete",
      url: "/match",
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

export { createMatch, getAllMatches, getMatch, EditMatchFunc, deleteMatch };
