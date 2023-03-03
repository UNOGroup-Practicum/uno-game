import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { APIError } from "./types";

const normalizeError = (error: unknown): APIError => {
  const result: APIError = { reason: "Что-то пошло не так" };

  if (axios.isAxiosError(error)) {
    if (error.response) {
      result.reason = error.response.data.reason;
      result.status = error.response.status;
    } else if (error.request) {
      result.reason = error.request;
    } else {
      result.reason = error.message;
    }
  }

  return result;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
});

export const request = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    try {
      const result = await axiosInstance.get<T, AxiosResponse<T>>(url, config);

      return result.data;
    } catch (error) {
      return normalizeError(error);
    }
  },

  post: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    try {
      const result = await axiosInstance.post<T, AxiosResponse<T>, D>(url, data, config);

      return result.data;
    } catch (error) {
      return normalizeError(error);
    }
  },

  put: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    try {
      const result = await axiosInstance.put<T, AxiosResponse<T>, D>(url, data, config);

      return result.data;
    } catch (error) {
      return normalizeError(error);
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    try {
      const result = await axiosInstance.delete<T, AxiosResponse<T>>(url, config);

      return result.data;
    } catch (error) {
      return normalizeError(error);
    }
  },
};
