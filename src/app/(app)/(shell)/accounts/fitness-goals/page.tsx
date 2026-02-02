"use client";

import { useState, useEffect } from "react";
import { EditableField } from "../_components/editable-field";
import { Skeleton } from "@/components/ui/skeleton";
import { showToast } from "@/lib/client/toast";

interface FitnessGoals {
  primaryGoals: string;
  targetWeight: string;
  commitmentLevel: string;
  weeklyFrequency: string;
}

export default function FitnessGoalsPage() {
  const [goals, setGoals] = useState<FitnessGoals | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/accounts/fitness-goals");
      if (!response.ok) throw new Error("Failed to fetch goals");
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error("Error fetching goals:", error);
      showToast({ type: "error", message: "Failed to load fitness goals" });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = async (field: keyof FitnessGoals, value: string) => {
    try {
      const response = await fetch("/api/accounts/fitness-goals", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      if (!response.ok) throw new Error("Failed to update");

      const updated = await response.json();
      setGoals(updated);
      showToast({ type: "success", message: "Updated successfully" });
    } catch (error) {
      console.error("Error updating field:", error);
      showToast({ type: "error", message: "Failed to update field" });
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!goals) {
    return <div>Failed to load fitness goals</div>;
  }

  return (
    <div className="space-y-0">
      <h2 className="text-xl font-semibold mb-6">Fitness Goals</h2>

      <EditableField
        label="Primary Goals"
        description="Your main fitness objectives (displayed as comma-separated list)"
        value={goals.primaryGoals}
        onSave={(value) => updateField("primaryGoals", value)}
        type="text"
        placeholder="e.g., Muscle Gain, Strength Training"
      />

      <EditableField
        label="Target Weight"
        description="Your goal weight in kilograms (leave blank if not weight-focused)"
        value={goals.targetWeight}
        onSave={(value) => updateField("targetWeight", value)}
        type="number"
        placeholder="Enter target weight (kg)"
      />

      <EditableField
        label="Commitment Level"
        description="How much time you can dedicate to fitness weekly"
        value={goals.commitmentLevel}
        onSave={(value) => updateField("commitmentLevel", value)}
        type="select"
        options={[
          { value: "CASUAL", label: "Casual (1-2 hours/week)" },
          { value: "MODERATE", label: "Moderate (3-5 hours/week)" },
          { value: "SERIOUS", label: "Serious (6-10 hours/week)" },
          { value: "COMPETITIVE", label: "Competitive (10+ hours/week)" },
        ]}
        placeholder="Select commitment level"
      />

      <EditableField
        label="Weekly Frequency"
        description="How many days per week you plan to train"
        value={goals.weeklyFrequency}
        onSave={(value) => updateField("weeklyFrequency", value)}
        type="select"
        options={[
          { value: "1_2_DAYS", label: "1-2 days per week" },
          { value: "3_4_DAYS", label: "3-4 days per week" },
          { value: "5_6_DAYS", label: "5-6 days per week" },
          { value: "7_DAYS", label: "7 days per week" },
        ]}
        placeholder="Select weekly frequency"
      />
    </div>
  );
}
