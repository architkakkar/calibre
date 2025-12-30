import {
  GENDERS,
  ACTIVITY_LEVELS,
  ACTIVITY_LEVEL_LABELS,
  FITNESS_LEVELS,
  FITNESS_LEVEL_LABELS,
  GOALS,
  MOTIVATIONS,
  COMMITMENT_LEVELS,
  COMMITMENT_LEVEL_LABELS,
  WEEKLY_FREQUENCIES,
  WEEKLY_FREQUENCY_LABELS,
} from "@/lib/shared/constants";
import {
  genderEnum,
  activityLevelEnum,
  fitnessLevelEnum,
  primaryGoalEnum,
  commitmentLevelEnum,
  weeklyFrequencyEnum,
  motivationEnum,
} from "@/lib/server/db/enums";
import { mapToDbEnum } from "@/lib/shared/utils";

type Option<T extends string> = { value: T; label: string };

export const getGenderOptions = (): Option<(typeof GENDERS)[number]>[] =>
  GENDERS.map((v) => ({
    value: v,
    label: v,
  }));

export const getActivityLevelOptions = (): Option<
  (typeof ACTIVITY_LEVELS)[number]
>[] =>
  ACTIVITY_LEVELS.map((v) => ({
    value: v,
    label: ACTIVITY_LEVEL_LABELS[v],
  }));

export const getFitnessLevelOptions = (): Option<
  (typeof FITNESS_LEVELS)[number]
>[] =>
  FITNESS_LEVELS.map((v) => ({
    value: v,
    label: FITNESS_LEVEL_LABELS[v],
  }));

export const getGoalOptions = (): Option<(typeof GOALS)[number]>[] =>
  GOALS.map((v) => ({
    value: v,
    label: v,
  }));

export const getMotivationOptions = (): Option<
  (typeof MOTIVATIONS)[number]
>[] =>
  MOTIVATIONS.map((v) => ({
    value: v,
    label: v,
  }));

export const getCommitmentOptions = (): Option<
  (typeof COMMITMENT_LEVELS)[number]
>[] =>
  COMMITMENT_LEVELS.map((v) => ({
    value: v,
    label: COMMITMENT_LEVEL_LABELS[v],
  }));

export const getWeeklyFrequencyOptions = (): Option<
  (typeof WEEKLY_FREQUENCIES)[number]
>[] =>
  WEEKLY_FREQUENCIES.map((v) => ({
    value: v,
    label: WEEKLY_FREQUENCY_LABELS[v],
  }));

export const GENDER_MAP = mapToDbEnum(GENDERS, genderEnum.enumValues);

export const ACTIVITY_LEVEL_MAP = mapToDbEnum(
  ACTIVITY_LEVELS,
  activityLevelEnum.enumValues
);

export const FITNESS_LEVEL_MAP = mapToDbEnum(
  FITNESS_LEVELS,
  fitnessLevelEnum.enumValues
);

export const PRIMARY_GOAL_MAP = mapToDbEnum(GOALS, primaryGoalEnum.enumValues);

export const COMMITMENT_LEVEL_MAP = mapToDbEnum(
  COMMITMENT_LEVELS,
  commitmentLevelEnum.enumValues
);

export const WEEKLY_FREQUENCY_MAP = mapToDbEnum(
  WEEKLY_FREQUENCIES,
  weeklyFrequencyEnum.enumValues
);

export const MOTIVATION_MAP = mapToDbEnum(
  MOTIVATIONS,
  motivationEnum.enumValues
);
