import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/services/user.service";

export async function handleClerkWebhook(event: WebhookEvent) {
  if (event.type !== "user.created") {
    return { handled: false };
  }

  const { id, email_addresses, primary_email_address_id } = event.data;

  const primaryEmail = email_addresses.find(
    (email) => email.id === primary_email_address_id
  );

  if (!primaryEmail) {
    throw new Error("Primary email not found");
  }

  await createUser({
    id,
    email: primaryEmail.email_address,
  });

  return { handled: true };
}
