import axios from "axios";

const instance = axios.create({
  baseURL: __API_BASEURL__,
  withCredentials: true,
});

export const themeAPI = {
  async getTheme() {
    return instance.get("/theme");
  },

  async putTheme(theme: string) {
    return instance.put("/theme", { data: { theme } });
  },
};
