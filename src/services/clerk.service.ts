import { clerkClient, currentUser, EmailAddress } from "@clerk/nextjs/server";
import invariant from "tiny-invariant";

export const getUserEmailAddressByEmailId = async (emailId: string): Promise<EmailAddress> => {
  return clerkClient().emailAddresses.getEmailAddress(emailId);
};

export const getAuthUser = async () => {
  const user = await currentUser();

  invariant(user, "User is not sign in");

  return user;
};
