import axios from "axios";

type UserDTO = {
  id: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);

    this.name = "ApiError";
    this.status = status;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.API_YANDEX_BASEURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return Promise.reject(new ApiError(error.response.data.reason, error.response.status));
      }
    }

    return Promise.reject(error);
  }
);

export class YandexAPIService {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrentUser() {
    const result = await axiosInstance.get<UserDTO>("/api/v2/auth/user", {
      headers: {
        cookie: this._cookieHeader,
      },
    });

    return result.data;
  }
}
