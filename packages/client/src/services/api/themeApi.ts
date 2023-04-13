import axios from "axios";

export const themeAPI = {
  async getTheme() {
    return axios.get(`${__API_BASEURL__}/theme`, { withCredentials: true });
  },
};
