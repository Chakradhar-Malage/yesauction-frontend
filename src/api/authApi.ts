import axiosClient from "./axiosClient";

interface LoginRequest {
    usernameOrEmail: string;
    password: string;
}

export const loginUser = async (data: LoginRequest) => {
  const response = await axiosClient.post("/auth/login", data);
  return response.data;
};