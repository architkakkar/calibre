"use client";

import { useState, useEffect } from "react";
import { EditableField } from "../_components/editable-field";
import { Skeleton } from "@/components/ui/skeleton";
import { showToast } from "@/lib/client/toast";

interface PhysicalStats {
  height: string;
  weight: string;
  activityLevel: string;
  fitnessLevel: string;
}

export default function PhysicalStatsPage() {
  const [stats, setStats] = useState<PhysicalStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/accounts/physical-stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      showToast({ type: "error", message: "Failed to load physical stats" });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = async (field: keyof PhysicalStats, value: string) => {
    try {
      const response = await fetch("/api/accounts/physical-stats", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      if (!response.ok) throw new Error("Failed to update");

      const updated = await response.json();
      setStats(updated);
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

  if (!stats) {
    return <div>Failed to load physical stats</div>;
  }

  return (
    <div className="space-y-0">
      <h2 className="text-xl font-semibold mb-6">Physical Stats</h2>

      <EditableField
        label="Height"
        description="Your height in centimeters (used for BMI and calorie calculations)"
        value={stats.height}
        onSave={(value) => updateField("height", value)}
        type="number"
        placeholder="Enter height (cm)"
      />

      <EditableField
        label="Weight"
        description="Your current weight in kilograms (tracked for progress monitoring)"
        value={stats.weight}
        onSave={(value) => updateField("weight", value)}
        type="number"
        placeholder="Enter weight (kg)"
      />

      <EditableField
        label="Activity Level"
        description="Your typical daily activity outside of structured workouts"
        value={stats.activityLevel}
        onSave={(value) => updateField("activityLevel", value)}
        type="select"
        options={[
          {
            value: "SEDENTARY",
            label: "Sedentary (desk job, minimal activity)",
          },
          {
            value: "LIGHTLY_ACTIVE",
            label: "Lightly Active (light exercise 1-3 days/week)",
          },
          {
            value: "MODERATELY_ACTIVE",
            label: "Moderately Active (moderate exercise 3-5 days/week)",
          },
          {
            value: "VERY_ACTIVE",
            label: "Very Active (intense exercise 6-7 days/week)",
          },
          {
            value: "EXTREMELY_ACTIVE",
            label: "Extremely Active (physical job + intense training)",
          },
        ]}
        placeholder="Select activity level"
      />

      <EditableField
        label="Fitness Level"
        description="Your current experience with structured training programs"
        value={stats.fitnessLevel}
        onSave={(value) => updateField("fitnessLevel", value)}
        type="select"
        options={[
          { value: "BEGINNER", label: "Beginner (new to fitness)" },
          {
            value: "INTERMEDIATE",
            label: "Intermediate (6-12 months experience)",
          },
          { value: "ADVANCED", label: "Advanced (1-3 years experience)" },
          { value: "EXPERT", label: "Expert (3+ years experience)" },
        ]}
        placeholder="Select fitness level"
      />
    </div>
  );
}
