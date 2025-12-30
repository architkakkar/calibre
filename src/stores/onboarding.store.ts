import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  UserProfileSchema,
  FitnessGoalsSchema,
  OnboardingSchema,
  type UserProfile,
  type FitnessGoals,
  type OnboardingPayload,
} from "@/lib/validators/onboarding.validator";
import { submitOnboarding } from "@/lib/client/api/onboarding.api";

type ClientProfile = Omit<UserProfile, "dob"> & { dobIso?: string };

type OnboardingState = {
  // States
  profile: Partial<ClientProfile>;
  goals: Partial<FitnessGoals>;

  // Derived flags
  isUserProfileComplete: boolean;
  isFitnessGoalsComplete: boolean;

  // Actions
  updateProfile: (patch: Partial<ClientProfile>) => void;
  updateGoals: (patch: Partial<OnboardingState["goals"]>) => void;
  reset: () => void;
  getPayload: () => OnboardingPayload | null;
  recomputeCompletion: () => void;
  completeOnboarding: () => Promise<boolean>;
};

const defaultState: Pick<OnboardingState, "profile" | "goals"> = {
  profile: {
    firstName: "",
    lastName: "",
    dobIso: undefined,
    gender: undefined,
    heightCm: undefined,
    weightKg: undefined,
    activityLevel: undefined,
    fitnessLevel: undefined,
  },
  goals: {
    primaryGoals: [],
    targetWeightKg: undefined,
    commitmentLevel: undefined,
    weeklyFrequency: undefined,
    motivations: [],
    notes: undefined,
  },
};

function validateUserProfile(profile: Partial<ClientProfile>): boolean {
  const parsed = UserProfileSchema.safeParse({
    firstName: profile.firstName ?? "",
    lastName: profile.lastName ?? "",
    dob: profile.dobIso ?? "",
    gender: profile.gender,
    heightCm:
      typeof profile.heightCm === "string"
        ? Number(profile.heightCm)
        : profile.heightCm,
    weightKg:
      typeof profile.weightKg === "string"
        ? Number(profile.weightKg)
        : profile.weightKg,
    activityLevel: profile.activityLevel,
    fitnessLevel: profile.fitnessLevel,
  });

  return parsed.success;
}

function validateFitnessGoals(goals: Partial<FitnessGoals>): boolean {
  const parsed = FitnessGoalsSchema.safeParse({
    primaryGoals: goals.primaryGoals ?? [],
    weeklyFrequency: goals.weeklyFrequency,
    motivations: goals.motivations ?? [],
    targetWeightKg:
      typeof goals.targetWeightKg === "string"
        ? Number(goals.targetWeightKg)
        : goals.targetWeightKg,
    commitmentLevel: goals.commitmentLevel,
    notes: goals.notes,
  });

  return parsed.success;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      isUserProfileComplete: false,
      isFitnessGoalsComplete: false,

      updateProfile: (patch) => {
        const next = { ...get().profile, ...patch };
        const isComplete = validateUserProfile(next);
        set({
          profile: next,
          isUserProfileComplete: isComplete,
        });
      },

      updateGoals: (patch) => {
        const next = { ...get().goals, ...patch };
        const isComplete = validateFitnessGoals(next);
        set({
          goals: next,
          isFitnessGoalsComplete: isComplete,
        });
      },

      reset: () =>
        set({
          ...defaultState,
          isUserProfileComplete: false,
          isFitnessGoalsComplete: false,
        }),

      recomputeCompletion: () => {
        const { profile, goals } = get();
        const isUserProfileComplete = validateUserProfile(profile);
        const isFitnessGoalsComplete = validateFitnessGoals(goals);
        set({
          isUserProfileComplete,
          isFitnessGoalsComplete,
        });
      },

      getPayload: () => {
        const {
          isUserProfileComplete,
          isFitnessGoalsComplete,
          profile,
          goals,
        } = get();
        
        if (!isUserProfileComplete || !isFitnessGoalsComplete) {
          return null;
        }

        const payload: OnboardingPayload = {
          profile: {
            firstName: profile.firstName ?? "",
            lastName: profile.lastName ?? "",
            dob: profile.dobIso ?? "",
            gender: profile.gender as UserProfile["gender"],
            heightCm:
              typeof profile.heightCm === "string"
                ? Number(profile.heightCm)
                : (profile.heightCm as number),
            weightKg:
              typeof profile.weightKg === "string"
                ? Number(profile.weightKg)
                : (profile.weightKg as number),
            activityLevel:
              profile.activityLevel as UserProfile["activityLevel"],
            fitnessLevel: profile.fitnessLevel as UserProfile["fitnessLevel"],
          },
          goals: {
            primaryGoals: (goals.primaryGoals ??
              []) as FitnessGoals["primaryGoals"],
            weeklyFrequency:
              goals.weeklyFrequency as FitnessGoals["weeklyFrequency"],
            motivations: (goals.motivations ??
              []) as FitnessGoals["motivations"],
            targetWeightKg:
              typeof goals.targetWeightKg === "string"
                ? Number(goals.targetWeightKg)
                : (goals.targetWeightKg as number),
            commitmentLevel: goals.commitmentLevel as FitnessGoals["commitmentLevel"],
            notes: goals.notes,
          },
        };

        const parsed = OnboardingSchema.safeParse(payload);
        return parsed.success ? payload : null;
      },

      completeOnboarding: async () => {
        const payload = get().getPayload();
        if (!payload) {
          return false;
        }
        await submitOnboarding(payload);
        get().reset();
        return true;
      }
    }),
    {
      name: "onboarding_store",
      partialize: (state) => ({ profile: state.profile, goals: state.goals }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.recomputeCompletion();
        }
      },
    }
  )
);
