"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { showToast } from "@/lib/client/toast";
import {
  Shield,
  Download,
  Trash2,
  AlertTriangle,
  Lock,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PrivacyPage() {
  const [settings, setSettings] = useState({
    analyticsEnabled: true,
    crashReportsEnabled: true,
    personalizedAds: false,
    dataSharing: false,
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async (key: keyof typeof settings) => {
    const newValue = !settings[key];
    setSettings((prev) => ({ ...prev, [key]: newValue }));

    try {
      const response = await fetch("/api/accounts/privacy", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: newValue }),
      });

      if (!response.ok) throw new Error("Failed to update settings");

      showToast({ type: "success", message: "Privacy settings updated" });
    } catch (error) {
      console.error("Error updating privacy settings:", error);
      // Revert on error
      setSettings((prev) => ({ ...prev, [key]: !newValue }));
      showToast({
        type: "error",
        message: "Failed to update settings. Please try again.",
      });
    }
  };

  const handleExportData = async () => {
    try {
      showToast({ type: "info", message: "Preparing your data export..." });

      const response = await fetch("/api/accounts/export-data", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to export data");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `calibre-data-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      showToast({
        type: "success",
        message: "Your data has been exported successfully",
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      showToast({
        type: "error",
        message: "Failed to export data. Please try again.",
      });
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch("/api/accounts/delete", {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete account");

      showToast({
        type: "success",
        message: "Your account has been scheduled for deletion",
      });

      // Redirect to logout or home page
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error deleting account:", error);
      showToast({
        type: "error",
        message: "Failed to delete account. Please contact support.",
      });
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Privacy & Data</h2>
        <p className="text-sm text-muted-foreground">
          Manage how your data is collected, used, and stored. Your privacy is
          our priority.
        </p>
      </div>

      {/* Data Collection Settings */}
      <div className="rounded-2xl border bg-card p-6 space-y-6">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-semibold">Data Collection Preferences</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Control what data we collect to improve your experience
              </p>
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between py-3 border-b border-dashed last:border-0">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Usage Analytics</Label>
                <p className="text-xs text-muted-foreground">
                  Help us improve by sharing anonymous usage data
                </p>
              </div>
              <Switch
                checked={settings.analyticsEnabled}
                onCheckedChange={() => handleToggle("analyticsEnabled")}
              />
            </div>

            {/* Crash Reports */}
            <div className="flex items-center justify-between py-3 border-b border-dashed last:border-0">
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Crash & Error Reports
                </Label>
                <p className="text-xs text-muted-foreground">
                  Automatically send crash reports to help us fix issues
                </p>
              </div>
              <Switch
                checked={settings.crashReportsEnabled}
                onCheckedChange={() => handleToggle("crashReportsEnabled")}
              />
            </div>

            {/* Personalized Ads */}
            <div className="flex items-center justify-between py-3 border-b border-dashed last:border-0">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Personalized Ads</Label>
                <p className="text-xs text-muted-foreground">
                  Show ads tailored to your interests
                </p>
              </div>
              <Switch
                checked={settings.personalizedAds}
                onCheckedChange={() => handleToggle("personalizedAds")}
              />
            </div>

            {/* Data Sharing */}
            <div className="flex items-center justify-between py-3">
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Third-Party Data Sharing
                </Label>
                <p className="text-xs text-muted-foreground">
                  Share anonymized data with fitness research partners
                </p>
              </div>
              <Switch
                checked={settings.dataSharing}
                onCheckedChange={() => handleToggle("dataSharing")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="rounded-2xl border bg-card p-6 space-y-4">
        <div className="flex items-start gap-3">
          <Lock className="h-5 w-5 text-primary mt-0.5" />
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold">Data Management</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Export or delete your personal data
              </p>
            </div>

            {/* Export Data */}
            <div className="flex items-start justify-between py-3 border-b border-dashed">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Export Your Data</Label>
                <p className="text-xs text-muted-foreground">
                  Download all your account data in JSON format
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportData}
                className="shrink-0"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            {/* Delete Account */}
            <div className="flex items-start justify-between py-3">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-destructive">
                  Delete Account
                </Label>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="shrink-0"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Info */}
      <div className="rounded-lg bg-muted/50 p-4 space-y-2">
        <div className="flex items-start gap-3">
          <Eye className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Your Data is Secure</p>
            <p className="text-xs text-muted-foreground">
              All your data is encrypted and stored securely. We never sell your
              personal information. Read our{" "}
              <a href="/privacy-policy" className="underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="underline">
                Terms of Service
              </a>{" "}
              for more details.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete Account?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers, including:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Profile information and settings</li>
                <li>All workout and nutrition plans</li>
                <li>Progress tracking and history</li>
                <li>Chat conversations with Cal</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
