import callApi from "./callApi";

type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
type LoginType = {
  email: string;
  password: string;
};

export const registerUser = async (data: RegisterType) => {
  const response = await callApi().post("/auth/register", data);
  return response;
};

export const loginUser = async (data: LoginType) => {
  const response = await callApi().post("auth/login", data);
  return response;
};
