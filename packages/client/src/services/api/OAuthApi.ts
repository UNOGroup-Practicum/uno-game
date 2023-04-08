import { request } from "./apiRequest";
import { OAuthLoginRequestData, OAuthServiceRequestData, OAuthServiceResponse } from "./types";

export const OAauthAPI = {
  getServiceId: (data: OAuthServiceRequestData): Promise<OAuthServiceResponse> =>
    request.get<OAuthServiceResponse>("oauth/yandex/service-id", { params: data }),

  login: (data: OAuthLoginRequestData): Promise<"OK"> =>
    request.post<"OK", OAuthLoginRequestData>("oauth/yandex", data),
};
