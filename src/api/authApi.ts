import axiosClient from "./axiosClient";

interface LoginRequest {
    usernameOrEmail: string;
    password: string;
}

interface RegisterRequest {
    username: string,
    email: string,
    password: string
}

export const loginUser = async (data: LoginRequest) => {
  const response = await axiosClient.post("/auth/login", data);
  return response.data;
};

export const registerUser = async (data: RegisterRequest) => {
    const response = await axiosClient.post("/auth/register", data);
    return response.data;
}
