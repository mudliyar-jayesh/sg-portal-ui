// apiService.ts

import axios, { AxiosResponse } from "axios";

import { API_BASE_URL } from "./config";

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token dynamically for authenticated requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  if (token) {
    config.headers["Token"] = token;
  }
  return config;
});

// Interfaces
export interface IUser {
  id: number;
  email: string;
  name: string;
  mobile_number: string;
  country_id?: number;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
  type: string;
}

export interface IRegisterUser {
  email: string;
  name: string;
  mobile_number: string;
  password: string;
  type: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ITokenResponse {
  token: string;
}

export interface IPasswordChange {
  old_password: string;
  new_password: string;
  email_id : string;
}

// Error handler
const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data.message || "An error occurred";
  }
  return "An unexpected error occurred";
};

// API Calls
export const registerUser = async (
  data: IRegisterUser
): Promise<IUser | string> => {
  try {
    const response: AxiosResponse<IUser> = await axiosInstance.post(
      "/register",
      data
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const loginUser = async (
  data: ILoginUser
): Promise<ITokenResponse | string> => {
  try {
    const response: AxiosResponse<ITokenResponse> = await axiosInstance.post(
      "/login",
      data
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getAllUsers = async (): Promise<IUser[] | string> => {
  try {
    const response: AxiosResponse<IUser[]> = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getUserById = async (id: number): Promise<IUser | string> => {
  try {
    const response: AxiosResponse<IUser> = await axiosInstance.get(
      `/user?id=${id}`
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const updateUser = async (
  id: number,
  data: Partial<IUser>
): Promise<void | string> => {
  try {
    await axiosInstance.put(`/user?id=${id}`, data);
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const deleteUser = async (id: number): Promise<void | string> => {
  try {
    await axiosInstance.delete(`/user?id=${id}`);
  } catch (error) {
    return handleAxiosError(error);
  }
};

// Profile API
export const getUserProfile = async (): Promise<IUser | string> => {
  try {
    const response: AxiosResponse<IUser> = await axiosInstance.get("/profile");
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const changePassword = async (
  data: IPasswordChange
): Promise<void | string> => {
  try {
    await axiosInstance.post("/password/change", data);
  } catch (error) {
    return handleAxiosError(error);
  }
};
