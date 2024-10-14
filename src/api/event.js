import axiosInstance from "./axiosInstance";

export const getEvents = async (status = "publish") => {
  try {
    const response = await axiosInstance.get("/event", {
      params: {
        status,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getEvent = async (id) => {
  try {
    const response = await axiosInstance.get(`/event/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getEventsByUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/event/createdBy/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createEvent = async (data) => {
  try {
    const response = await axiosInstance.post("/event", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateEvent = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/event/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
