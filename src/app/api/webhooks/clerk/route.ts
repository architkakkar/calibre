import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { handleClerkWebhook } from "@/services/clerk-webhook.service";

export async function POST(request: Request) {
  const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!clerkWebhookSecret) {
    console.error(
      "CLERK_WEBHOOK_SIGNING_SECRET not configured in environment variables"
    );
    return new Response("CLERK_WEBHOOK_SIGNING_SECRET not configured", {
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
    console.error("Invalid webhook signature:", error);
    return new Response("Invalid webhook signature", { status: 400 });
  }

  try {
    const result = await handleClerkWebhook(event);

    if (!result.handled) {
      console.warn(`Event ignored: ${event.type}`);
      return new Response("Event ignored", { status: 200 });
    }

    return new Response("Webhook processed", { status: 200 });
  } catch (error) {
    console.error("Webhook handling failed:", error);
    return new Response("Webhook handling failed", { status: 500 });
  }
}
