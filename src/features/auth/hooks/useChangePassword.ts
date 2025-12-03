import { useState } from "react";
import { changePassword as changePasswordAPI } from "../services/authAPI";

interface ChangePasswordParams {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const changeUserPassword = async ({
    userId,
    currentPassword,
    newPassword,
  }: ChangePasswordParams) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await changePasswordAPI(userId, currentPassword, newPassword);
      setSuccess("Mật khẩu đã được đổi thành công! Đang đăng xuất...");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định";
      setError(errorMessage);

      console.error("Change password error occurred", {
        message: errorMessage,
        error: err,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    changePassword: changeUserPassword,
    loading,
    error,
    success,
    clearError,
  };
};
