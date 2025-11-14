import { useState } from "react";
import { registerUser } from "../services/authAPI";
import { RegisterRequest } from "../types/auth.types";
import { MESSAGE_REGISTER_FAILED } from "@/constants/common";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterRequest) => {
    setLoading(true);
    setError(null);

    try {
      const registeredUser = await registerUser(data);
      return registeredUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : MESSAGE_REGISTER_FAILED);
      throw new Error(
        err instanceof Error ? err.message : MESSAGE_REGISTER_FAILED
      );
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
