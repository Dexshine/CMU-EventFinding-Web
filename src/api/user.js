import axiosInstance from "./axiosInstance";

export const getProfile = async () => {
  try {
    const res = await axiosInstance.get(`/auth/profile`);

    return res.data;
  } catch (error) {
    console.error("Get Profile error:", error);
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
