import axiosInstance from "./axiosInstance";

export const createRequest = async (data) => {
  try {
    // {
    //     "event_id": "event20240004",
    //     "user_id": "66fc3e7fc674cda01c2ace70",
    //     "status": "join"
    // }

    const response = await axiosInstance.post("/request", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchRequest = async (userId, eventId, data) => {
  try {
    const response = await axiosInstance.patch(
      `/request/${userId}/${eventId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRequests = async ({ userId, eventId, status }) => {
  try {
    let params = {};

    if (userId) {
      params.user_id = userId;
    }

    if (eventId) {
      params.event_id = eventId;
    }

    if (status) {
      params.status = status;
    }

    const response = await axiosInstance.get(`/request/showBy`, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRequestsByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/request/user/${userId}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
