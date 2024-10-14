import axiosInstance from "./axiosInstance";

export const getUsers = async () => {
  try {
    const res = await axiosInstance.get(`/user`);

    return res.data;
  } catch (error) {
    console.error("Get Users error:", error);
  }
};

export const updateProfile = async (id, data) => {
  try {
    const res = await axiosInstance.patch(`/user/${id}`, data);

    return res.data;
  } catch (error) {
    console.error("Update Profile error:", error);
  }
};
