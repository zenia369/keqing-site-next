import backgroundData from "@/shared/mocks/profile_background.json";

export const getProfileBackground = async (): Promise<string> => {
  const randomNumber = Math.floor(Math.random() * backgroundData.length);

  return backgroundData.data[randomNumber] ?? backgroundData.data[0];
};
