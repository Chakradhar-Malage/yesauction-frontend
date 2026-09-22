import axiosClient from "./axiosClient";

export const getAllUsers = async() => {
    const response = await axiosClient.get("/users/admin/all");
    return response.data;
}

export const softDeleteUser = async(userId : number) => {
    const response = await axiosClient.delete("/users/admin/${userId}");
    return response.data;
}