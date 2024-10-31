import axiosInstance from "./axiosInstance";

export const createRequest = async (data) => {
  try {
    const response = await axiosInstance.post("/review", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchRequest = async (userId, eventId, data) => {
  try {
    const response = await axiosInstance.patch(
      `/review/${userId}/${eventId}`,
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

    const response = await axiosInstance.get(`/review/showBy`, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRequestsByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/review/user/${userId}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
