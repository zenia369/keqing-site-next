import { RequestUserEmailSelf } from "@/app/api/user/email/route";
import { apiClient } from "@/shared/utils/api.client";

export const sendEmailSelf = async (
  data: Pick<RequestUserEmailSelf, "from" | "message">
): Promise<void> => {
  return apiClient.post<void, RequestUserEmailSelf>("/api/user/email", {
    intent: "user:email:self",
    ...data,
  });
};
