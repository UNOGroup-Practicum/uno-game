import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiError extends Error {
  constructor(public message: string, public status: number) {
    super(message);

    this.name = "ApiError";
    this.status = status;
  }
}

const axiosInstance = axios.create({
  baseURL: __API_ENDPOINT__,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // ApiError, чтобы была возможность фильтровать ошибки, если нужно
        return Promise.reject(new ApiError(error.response.data.reason, error.response.status));
      }
    }

    return Promise.reject(error);
  }
);

export const request = {
  get: async <T>(url: string, config?: AxiosRequestConfig) => {
    const result = await axiosInstance.get<T, AxiosResponse<T>>(url, config);

    return result.data;
  },

  post: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    const result = await axiosInstance.post<T, AxiosResponse<T>, D>(url, data, config);

    return result.data;
  },

  put: async <T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) => {
    const result = await axiosInstance.put<T, AxiosResponse<T>, D>(url, data, config);

    return result.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig) => {
    const result = await axiosInstance.delete<T, AxiosResponse<T>>(url, config);

    return result.data;
  },
};
