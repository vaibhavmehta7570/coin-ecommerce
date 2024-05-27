import axios, { AxiosResponse } from "axios";

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

export const Login = async (username: string, password: string) => {
  const loginData: LoginRequest = {
    username,
    password,
  };

  try {
    const response = await axios.post(
      "https://dummyjson.com/auth/login",
      loginData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data);
    } else {
      console.error("Login failed:", error?.message);
    }
  }
};
export const Logout = () => {
  return new Promise<void>((resolve, reject) => {
    try {
      localStorage.removeItem("auth");
      resolve();
    } catch (error) {
      console.error("Logout failed:", error);
      reject(error);
    }
  });
};
