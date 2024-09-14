import { EmailClient, EmailSendResponse } from "@azure/communication-email";
import invariant from "tiny-invariant";

invariant(
  process.env?.AZURE_SECRET_CONNECTION_STRING,
  "Env AZURE_SECRET_CONNECTION_STRING should be defined"
);
invariant(process.env?.AZURE_EMAIL_DONOTREPLY, "Env AZURE_EMAIL_DONOTREPLY should be defined");
invariant(process.env?.AZURE_EMAIL_SELF, "Env AZURE_EMAIL_SELF should be defined");

const emailClient = new EmailClient(process.env.AZURE_SECRET_CONNECTION_STRING);

export const sendEmailSelf = async ({
  from,
  message,
}: {
  from: string;
  message: string;
}): Promise<EmailSendResponse> => {
  const emailMessage = {
    senderAddress: process.env.AZURE_EMAIL_DONOTREPLY!,
    content: {
      subject: "Keqing site - self",
      plainText: `New message from - ${from}\n\nMessage: ${message}`,
    },
    recipients: {
      to: [{ address: process.env.AZURE_EMAIL_SELF! }],
    },
  };

  const poller = await emailClient.beginSend(emailMessage);
  const result = await poller.pollUntilDone();

  return result;
};
