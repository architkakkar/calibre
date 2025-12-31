import "server-only";

import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { createUser } from "@/lib/server/services/user.service";

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

export async function updateClerkUserMetadata({
  userId,
  type,
  metadata,
}: {
  userId: string;
  type: "publicMetadata" | "privateMetadata" | "unsafeMetadata";
  metadata: Record<string, unknown>;
}) {
  const clerk = await clerkClient();

  // updateUserMetadata() performs a deep merge with existing values, so other metadata is preserved
  await clerk.users.updateUserMetadata(userId, {
    [type]: metadata,
  });
}
