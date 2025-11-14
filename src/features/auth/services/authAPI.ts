import { RegisterRequest, User } from "../types/auth.types";
import { API_BASE_URL } from "@/constants/common";

export const registerUser = async (data: RegisterRequest): Promise<User> => {
  const userData = {
    id: crypto.randomUUID(),
    ...data,
  };

  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Đăng ký thất bại");
  }

  return response.json();
};
