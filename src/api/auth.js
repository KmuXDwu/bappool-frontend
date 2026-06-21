import api from "./client";

export const getSchools = () => {
  return api.get("/v1/schools");
};

export const sendEmailCode = ({ schoolId, email }) => {
  return api.post("/v1/auth/email/send-code", {
    schoolId,
    email,
  });
};

export const verifyEmailCode = ({ email, code }) => {
  return api.post("/v1/auth/email/verify-code", {
    email,
    code,
  });
};

export const signup = (signupData) => {
  return api.post("/v1/auth/signup", signupData);
};

export const login = async ({ email, password }) => {
  const response = await api.post("/v1/auth/login", {
    email,
    password,
  });

  const authData = response.data?.data || response.data;
  const { accessToken, refreshToken } = authData;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  return response;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
