import { RequestUpdateCard, RequestUpdateInfo } from "@/app/api/profile/card/route";
import { RequestUpdateStand } from "@/app/api/profile/stand/route";
import { apiClient } from "@/shared/utils/api.client";

export const updateUserCard = async (standCharacterId: string): Promise<void> => {
  return apiClient.patch<void, RequestUpdateCard>("/api/profile/card", {
    intent: "update:profile:card",
    standCharacterId,
  });
};

export const updateProfileInfo = async (data: Omit<RequestUpdateInfo, "intent">): Promise<void> => {
  return apiClient.patch<void, RequestUpdateInfo>("/api/profile/card", {
    intent: "update:profile:info",
    ...data,
  });
};

export const updateUserStand = async (data: Omit<RequestUpdateStand, "intent">): Promise<void> => {
  return apiClient.patch<void, RequestUpdateStand>("/api/profile/stand", {
    intent: "update:profile:stand",
    ...data,
  });
};
