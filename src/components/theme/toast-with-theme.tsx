"use client";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { IRANYekan } from "@/fonts/local-fonts";

export function Toaster() {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      className={`toaster group ${IRANYekan.className}`}
      richColors
      expand
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:border",
          title: "group-[.toast]:font-medium",
          description:
            "group-[.toast]:text-muted-foreground group-[.toast]:mt-1",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md",
          closeButton:
            "group-[.toast]:opacity-80 hover:group-[.toast]:opacity-100",
          success:
            "group toast group-[.toaster]:bg-green-50 group-[.toaster]:border-green-100 group-[.toaster]:text-green-700 dark:group-[.toaster]:bg-green-500/10 dark:group-[.toaster]:border-green-500/20 dark:group-[.toaster]:text-green-400",
          error:
            "group toast group-[.toaster]:bg-red-50 group-[.toaster]:border-red-100 group-[.toaster]:text-red-700 dark:group-[.toaster]:bg-red-500/10 dark:group-[.toaster]:border-red-500/20 dark:group-[.toaster]:text-red-400",
          warning:
            "group toast group-[.toaster]:bg-yellow-50 group-[.toaster]:border-yellow-100 group-[.toaster]:text-yellow-700 dark:group-[.toaster]:bg-yellow-500/10 dark:group-[.toaster]:border-yellow-500/20 dark:group-[.toaster]:text-yellow-400",
          info: "group toast group-[.toaster]:bg-blue-50 group-[.toaster]:border-blue-100 group-[.toaster]:text-blue-700 dark:group-[.toaster]:bg-blue-500/10 dark:group-[.toaster]:border-blue-500/20 dark:group-[.toaster]:text-blue-400",
        },
        duration: 5000,
      }}
    />
  );
}
