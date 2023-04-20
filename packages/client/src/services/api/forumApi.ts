import axios from "axios";

const instance = axios.create({
  baseURL: __API_BASEURL__,
  withCredentials: true,
});

export const forumAPI = {
  async getForumThemes() {
    const response = await instance.get("/forum");
    console.log(response);
    return response;
  },
};
