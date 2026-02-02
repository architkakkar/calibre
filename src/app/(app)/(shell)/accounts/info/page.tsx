"use client";

import { useState, useEffect } from "react";
import { EditableField } from "../_components/editable-field";
import { Skeleton } from "@/components/ui/skeleton";
import { showToast } from "@/lib/client/toast";

interface AccountInfo {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
}

export default function AccountInfoPage() {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  const fetchAccountInfo = async () => {
    try {
      const response = await fetch("/api/accounts/info");
      if (!response.ok) throw new Error("Failed to fetch account info");
      const data = await response.json();
      setAccountInfo(data);
    } catch (error) {
      console.error("Error fetching account info:", error);
      showToast({
        type: "error",
        message: "Failed to load account information",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = async (field: keyof AccountInfo, value: string) => {
    try {
      const response = await fetch("/api/accounts/info", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      if (!response.ok) throw new Error("Failed to update");

      const updated = await response.json();
      setAccountInfo(updated);
      showToast({ type: "success", message: "Updated successfully" });
    } catch (error) {
      console.error("Error updating field:", error);
      showToast({ type: "error", message: "Failed to update field" });
      throw error;
    }
  };

  if (isLoading) {
    return (
      <>
        <Skeleton className="h-8 w-32 mb-10" />
        <div className="space-y-4">
          <Skeleton className="h-18 w-full" />
          <Skeleton className="h-18 w-full" />
          <Skeleton className="h-18 w-full" />
          <Skeleton className="h-18 w-full" />
          <Skeleton className="h-18 w-full" />
        </div>
      </>
    );
  }

  if (!accountInfo) {
    return <div>Failed to load account information</div>;
  }

  return (
    <div className="space-y-0">
      <h2 className="text-xl font-semibold mb-6">Account Info</h2>

      <EditableField
        label="First Name"
        description="Your given name as it appears on official documents"
        value={accountInfo.firstName}
        onSave={(value) => updateField("firstName", value)}
        type="text"
        placeholder="Enter first name"
      />

      <EditableField
        label="Last Name"
        description="Your family name as it appears on official documents"
        value={accountInfo.lastName}
        onSave={(value) => updateField("lastName", value)}
        type="text"
        placeholder="Enter last name"
      />

      <EditableField
        label="Email Address"
        description="Primary email for account notifications and communications"
        value={accountInfo.email}
        onSave={(value) => updateField("email", value)}
        type="email"
        placeholder="Enter email address"
      />

      <EditableField
        label="Date of Birth"
        description="Used to calculate age-appropriate fitness recommendations"
        value={accountInfo.dateOfBirth}
        onSave={(value) => updateField("dateOfBirth", value)}
        type="date"
      />

      <EditableField
        label="Gender"
        description="Helps personalize fitness and nutrition calculations"
        value={accountInfo.gender}
        onSave={(value) => updateField("gender", value)}
        type="select"
        options={[
          { value: "MALE", label: "Male" },
          { value: "FEMALE", label: "Female" },
          { value: "OTHER", label: "Other" },
          { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say" },
        ]}
        placeholder="Select gender"
      />
    </div>
  );
}
