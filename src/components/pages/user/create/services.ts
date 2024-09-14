import { RequestUserCreate } from "@/app/api/user/create/route";
import { apiClient } from "@/shared/utils/api.client";

export const createUser = async (data: Omit<RequestUserCreate, "intent">): Promise<void> => {
  return apiClient.post<void, RequestUserCreate>("/api/user/create", {
    intent: "create:user",
    ...data,
  });
};
