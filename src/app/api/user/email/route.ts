import { NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";

import { sendEmailSelf } from "@/services/azure.service";

export type RequestUserEmailSelf = {
  intent: "user:email:self";
  from: string;
  message: string;
};

type RouteRequestTypes = RequestUserEmailSelf;

export async function POST(req: NextRequest) {
  const data: RouteRequestTypes = await req.json();

  switch (data?.intent) {
    case "user:email:self":
      return sendMessageSelf(data);

    default:
      return NextResponse.json({ message: "Unhandled intent" }, { status: 404 });
  }
}

async function sendMessageSelf({ from, message }: RequestUserEmailSelf) {
  try {
    invariant(from?.length, "Email should be provided");
    invariant(message?.length, "Message should be provided");

    const result = await sendEmailSelf({ from, message });

    if (result?.error || result.status !== "Succeeded") {
      throw new Error(`Unable to send email for ${from}`, {
        cause: {
          from,
          message,
          error: result?.error,
        },
      });
    }

    return NextResponse.json({ message: "Email successfully sent" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while sending email" },
      {
        status: 500,
      }
    );
  }
}
