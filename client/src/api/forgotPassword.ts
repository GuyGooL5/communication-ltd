import { protectedRequest } from "./requests";

const url = "api/forgotPassword";


const updatePassword = (email: string) =>
  async (onSuccess: (success: true) => void, onError: (error: string) => void) => {
    try {
      const response = await protectedRequest("POST", url, { email });
      if (!response.success) return onError(response.error ?? "Internal Error");
      return onSuccess(true);
    } catch (e) {
      onError("Internal Error");
    }
  };

export default updatePassword;
