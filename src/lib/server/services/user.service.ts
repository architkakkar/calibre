import "server-only";

import { db } from "@/lib/server/db/drizzle";
import { eq } from "drizzle-orm";
import { updateClerkUserMetadata } from "@/lib/server/services/clerk.service";
import {
  usersTable,
  userProfilesTable,
  userGoalsTable,
} from "@/lib/server/db/schema";
import {
  UserProfile,
  FitnessGoals,
} from "@/lib/validators/onboarding.validator";
import {
  GENDER_MAP,
  ACTIVITY_LEVEL_MAP,
  FITNESS_LEVEL_MAP,
  PRIMARY_GOAL_MAP,
  COMMITMENT_LEVEL_MAP,
  WEEKLY_FREQUENCY_MAP,
  MOTIVATION_MAP,
} from "@/lib/shared/helpers";

export async function createUser({ id, email }: { id: string; email: string }) {
  if (!id || !email) {
    throw new Error("Invalid user data");
  }

  // create user if not exists
  await db
    .insert(usersTable)
    .values({
      id,
      email,
    })
    .onConflictDoNothing();

  // initialize clerk user public metadata
  await updateClerkUserMetadata({
    userId: id,
    type: "publicMetadata",
    metadata: {
      isSubscribed: false,
      onboardingStatus: "PENDING",
    },
  });
}

export async function onboardUser({
  userId,
  email,
  profile,
  goals,
}: {
  userId: string;
  email: string | undefined;
  profile: UserProfile;
  goals: FitnessGoals;
}) {
  const userProfileData = {
    users_id: userId,
    first_name: profile.firstName,
    last_name: profile.lastName,
    dob: profile.dob,
    gender: GENDER_MAP[profile.gender],
    height_cm: profile.heightCm,
    weight_kg: profile.weightKg,
    activity_level: ACTIVITY_LEVEL_MAP[profile.activityLevel],
    fitness_level: FITNESS_LEVEL_MAP[profile.fitnessLevel],
  };
  const userGoalsData = {
    users_id: userId,
    primary_goals: goals.primaryGoals.map((goal) => PRIMARY_GOAL_MAP[goal]),
    target_weight_kg: goals.targetWeightKg,
    commitment_level: COMMITMENT_LEVEL_MAP[goals.commitmentLevel],
    weekly_frequency: WEEKLY_FREQUENCY_MAP[goals.weeklyFrequency],
    motivations: goals.motivations.map(
      (motivation) => MOTIVATION_MAP[motivation]
    ),
    notes: goals.notes ?? null,
  };

  // ensure user exists
  await createUser({ id: userId, email: email ?? "" });

  // update onboarding status
  await db
    .update(usersTable)
    .set({ onboarding_status: "COMPLETED", updated_at: new Date() })
    .where(eq(usersTable.id, userId));

  // insert user profile details
  await db
    .insert(userProfilesTable)
    .values(userProfileData)
    .onConflictDoUpdate({
      target: userProfilesTable.users_id,
      set: userProfileData,
    });

  // insert user fitness goals
  await db.insert(userGoalsTable).values(userGoalsData).onConflictDoUpdate({
    target: userGoalsTable.users_id,
    set: userGoalsData,
  });

  // sync onboarding status to clerk user public metadata
  await updateClerkUserMetadata({
    userId,
    type: "publicMetadata",
    metadata: {
      onboardingStatus: "COMPLETED",
    },
  });
}
