import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

type ToastOptions = {
  type: ToastType;
  message: string;
};

export function showToast({ type, message }: ToastOptions) {
  switch (type) {
    case "success":
      toast.success(message);
      break;

    case "error":
      toast.error(message);
      break;

    case "info":
      toast(message);
      break;

    case "warning":
      toast.warning(message);
      break;

    default:
      toast(message);
  }
}
