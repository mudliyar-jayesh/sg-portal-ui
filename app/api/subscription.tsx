"use client";

import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "./config";
// Define the base URL of your API

// Define interfaces for the data structures used in your application

export interface Subscription {
  createdAt: string | number | Date;
  id: number;
  name: string;
  code: string;
  // createdAt: string;
  // updatedAt: string;
}

export interface UserSubscriptionMapping {
  id: number;
  userId: number;
  subscriptionId: number;
}

export interface FeatureSubscriptionMapping {
  id: number;
  featureId: number;
  subscriptionId: number;
}

export interface ApiError {
  message: string;
}

// Axios instance for handling base URL and headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle errors
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data.message || "An error occurred";
  }
  return "An unexpected error occurred";
};
// API Functions

// Get all subscriptions
export const getAllSubscriptions = async (): Promise<
  Subscription[] | ApiError
> => {
  try {
    const response: AxiosResponse<Subscription[]> =
      await api.get("/subscriptions");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Create a new subscription
export const createSubscription = async (
  subscription: Omit<Subscription, "id">
): Promise<Subscription | ApiError> => {
  try {
    const response: AxiosResponse<Subscription> = await api.post(
      "/subscriptions",
      subscription
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Update a subscription
export const updateSubscription = async (
  subscriptionId: number,
  updates: Partial<Subscription>
): Promise<void | ApiError> => {
  try {
    await api.put(
      `/subscriptions/update?subscriptionId=${subscriptionId}`,
      updates
    );
  } catch (error) {
    return handleError(error);
  }
};

// Delete a subscription
export const deleteSubscription = async (
  subscriptionId: number
): Promise<void | ApiError> => {
  try {
    await api.delete(`/subscriptions?subscriptionId=${subscriptionId}`);
  } catch (error) {
    return handleError(error);
  }
};

// Get subscriptions by user
export const getSubscriptionsByUser = async (
  userId: number
): Promise<Subscription[] | ApiError> => {
  try {
    const response: AxiosResponse<Subscription[]> = await api.get(
      `/subscriptions/user?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Map user to subscription
export const mapUserToSubscription = async (
  mapping: UserSubscriptionMapping
): Promise<UserSubscriptionMapping | ApiError> => {
  try {
    const response: AxiosResponse<UserSubscriptionMapping> = await api.post(
      "/subscriptions/mapping",
      mapping
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Get features by subscription
export const getFeaturesBySubscription = async (
  subscriptionId: number
): Promise<FeatureSubscriptionMapping[] | ApiError> => {
  try {
    const response: AxiosResponse<FeatureSubscriptionMapping[]> = await api.get(
      `/subscriptions/features/list?subscriptionId=${subscriptionId}`
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Map feature to subscription
export const mapFeatureToSubscription = async (
  mapping: FeatureSubscriptionMapping
): Promise<FeatureSubscriptionMapping | ApiError> => {
  try {
    const response: AxiosResponse<FeatureSubscriptionMapping> = await api.post(
      "/subscriptions/features",
      mapping
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
