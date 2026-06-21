import api from "./client";

export const getChatRooms = () => {
  return api.get("/v1/chatrooms");
};

export const getChatRoom = (chatRoomId) => {
  return api.get(`/v1/chatrooms/${chatRoomId}`);
};

export const getChatMessages = (chatRoomId, params) => {
  return api.get(`/v1/chatrooms/${chatRoomId}/messages`, { params });
};

export const sendChatMessage = (chatRoomId, content) => {
  return api.post(`/v1/chatrooms/${chatRoomId}/messages`, {
    content,
  });
};

export const proposeAppointment = (chatRoomId, proposalData) => {
  return api.post(`/v1/chatrooms/${chatRoomId}/appointments/proposals`, proposalData);
};

export const acceptAppointmentProposal = ({ chatRoomId, proposalId }) => {
  return api.patch(`/v1/chatrooms/${chatRoomId}/appointments/proposals/${proposalId}/accept`);
};

export const rejectAppointmentProposal = ({ chatRoomId, proposalId }) => {
  return api.patch(`/v1/chatrooms/${chatRoomId}/appointments/proposals/${proposalId}/reject`);
};

export const closeChatRoom = (chatRoomId) => {
  return api.patch(`/v1/chatrooms/${chatRoomId}/close`);
};
