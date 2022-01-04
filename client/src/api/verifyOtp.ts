import { protectedRequest } from "./requests";

const url = "api/verifyPassword";

type ResponseType = { newPassword: string };

const verifyOtp = (email: string, otp: string) =>
  async (onSuccess: (newPassword: string) => void, onError: (error: string) => void) => {
    try {
      const response = await protectedRequest<ResponseType>("POST", url, { email, otp });
      if (!response.success) return onError(response.error ?? "Internal Error");
      return onSuccess(response.data.newPassword);
    } catch (e) {
      onError("Internal Error");
    }
  };

export default verifyOtp;
