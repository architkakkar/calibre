import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/server/drizzle";
import { usersTable } from "@/db/schema";

const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

export async function POST(request: Request) {
  if (!clerkWebhookSecret) {
    console.error(
      "CLERK_WEBHOOK_SIGNING_SECRET not set in environment variables"
    );
    return new Response("CLERK_WEBHOOK_SIGNING_SECRET not set", {
      status: 500,
    });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers");
    return new Response("Missing Svix headers", { status: 400 });
  }

  const payload = await request.json();
  const webhook = new Webhook(clerkWebhookSecret);
  let event: WebhookEvent;

  try {
    event = webhook.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Invalid clerk webhook signature:", error);
    return new Response("Invalid clerk webhook signature", { status: 400 });
  }

  if (event.type === "user.created") {
    try {
      const { id, email_addresses, primary_email_address_id } = event.data;
      const primaryEmail = email_addresses.find(
        (email) => email.id === primary_email_address_id
      );

      if (!primaryEmail) {
        console.error("Primary email not found");
        return new Response("Primary email not found", { status: 400 });
      }

      await db
        .insert(usersTable)
        .values({ id, email: primaryEmail.email_address })
        .onConflictDoNothing();

      return new Response(`user.created event type webhook received`, { status: 200 });
    } catch (error) {
      console.error("Database insertion failed:", error);
      return new Response("Database insertion failed", { status: 500 });
    }
  } else {
    console.warn(`Event type not handled: ${event.type}`);
    return new Response(`Event type not handled`, { status: 200 });
  }
}
