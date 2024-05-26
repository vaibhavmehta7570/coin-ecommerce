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

export const Login = async ({username, password}:LoginRequest): Promise<void> => {
  const loginData: LoginRequest = {
    username,
    password,
  };

  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      "https://dummyjson.com/auth/login",
      loginData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Login successful:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data);
    } else {
      console.error("Login failed:", error?.message);
    }
  }
};


