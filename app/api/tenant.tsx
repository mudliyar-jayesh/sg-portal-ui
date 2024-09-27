"use client";

import axios, { AxiosResponse } from "axios";

// API base URL from config
import { API_BASE_URL } from "./config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interfaces for Tenant and Mappings
export interface Tenant {
  id?: number;
  companyGuid: string;
  companyName?: string;
  host?: string;
  bmrmPort?: number;
  sgBizPort?: number;
  tallySyncPort?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserTenantMapping {
  id?: number;
  userId: number;
  tenantId: number;
}

// Error Handler
const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data.message || "An error occurred";
  }
  return "An unexpected error occurred";
};

// API Calls
export const createTenant = async (
  tenant: Tenant
): Promise<Tenant | string> => {
  try {
    const response: AxiosResponse<Tenant> = await axiosInstance.post(
      "/tenants",
      tenant
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const mapUserToTenant = async (
  mapping: UserTenantMapping
): Promise<UserTenantMapping | string> => {
  try {
    const response: AxiosResponse<UserTenantMapping> = await axiosInstance.post(
      "/tenants/mapping",
      mapping
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const mapUsersToTenant = async (
  mappings: UserTenantMapping[]
): Promise<UserTenantMapping[] | string> => {
  try {
    const response: AxiosResponse<UserTenantMapping[]> =
      await axiosInstance.post("/tenants/mappings", mappings);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getAllTenants = async (): Promise<Tenant[] | string> => {
  try {
    const response: AxiosResponse<Tenant[]> =
      await axiosInstance.get("/tenants");
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getTenantsByUser = async (
  userId: number
): Promise<Tenant[] | string> => {
  try {
    const response: AxiosResponse<Tenant[]> = await axiosInstance.get(
      `/tenants/user?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const updateTenant = async (
  tenantId: number,
  updates: Partial<Tenant>
): Promise<void | string> => {
  try {
    await axiosInstance.put(`/tenants/update?tenantId=${tenantId}`, updates);
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const deleteUserTenantMapping = async (
  userId: number,
  tenantId: number
): Promise<void | string> => {
  try {
    await axiosInstance.delete(
      `/tenants/mapping?userId=${userId}&tenantId=${tenantId}`
    );
  } catch (error) {
    return handleAxiosError(error);
  }
};
