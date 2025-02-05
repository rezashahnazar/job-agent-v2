import { useCallback } from "react";
import { toast } from "sonner";

interface ToastOptions {
  duration?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
}

interface UseToastReturn {
  toastSuccess: (message: string, options?: ToastOptions) => void;
  toastError: (message: string, options?: ToastOptions) => void;
  toastWarning: (message: string, options?: ToastOptions) => void;
  toastInfo: (message: string, options?: ToastOptions) => void;
}

export const useToast = (): UseToastReturn => {
  const toastSuccess = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.success(message, options);
    },
    []
  );

  const toastError = useCallback((message: string, options?: ToastOptions) => {
    toast.error(message, options);
  }, []);

  const toastWarning = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.warning(message, options);
    },
    []
  );

  const toastInfo = useCallback((message: string, options?: ToastOptions) => {
    toast.info(message, options);
  }, []);

  return {
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo,
  };
};
