import api from "./client";

export const getMatchRecommendations = (params) => {
  return api.get("/v1/matches/recommendations", { params });
};

export const requestMatch = ({ receiverUserId, message, interestIds }) => {
  return api.post("/v1/matches/requests", {
    receiverUserId,
    message,
    interestIds,
  });
};

export const getReceivedMatchRequests = () => {
  return api.get("/v1/matches/requests/received");
};

export const getSentMatchRequests = () => {
  return api.get("/v1/matches/requests/sent");
};

export const acceptMatchRequest = (matchRequestId) => {
  return api.patch(`/v1/matches/requests/${matchRequestId}/accept`);
};

export const rejectMatchRequest = (matchRequestId) => {
  return api.patch(`/v1/matches/requests/${matchRequestId}/reject`);
};

export const cancelMatchRequest = (matchRequestId) => {
  return api.patch(`/v1/matches/requests/${matchRequestId}/cancel`);
};
