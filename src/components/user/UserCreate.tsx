"use client";
import type { User } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { useToast } from "@/hook/use-toast";
import { ErrorResponse } from "@/types/api";
import { mutate } from "swr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function UserCreate() {
  const { toastSuccess, toastError } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<Partial<User>>({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof User, boolean>>>(
    {}
  );

  const validateField = (name: keyof User, value: string) => {
    switch (name) {
      case "email":
        return !value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "firstName":
      case "lastName":
        return !value || value.length < 2;
      default:
        return false;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({
      ...errors,
      [name]: validateField(name as keyof User, value),
    });
  };

  const resetForm = () => {
    setUser({ email: "", firstName: "", lastName: "" });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      email: validateField("email", user.email || ""),
      firstName: validateField("firstName", user.firstName || ""),
      lastName: validateField("lastName", user.lastName || ""),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      toastError("لطفاً خطاهای اعتبارسنجی را برطرف کنید", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    try {
      const res = await fetch("api/user", {
        method: "POST",
        body: JSON.stringify(user),
      });
      const data = await res.json();

      if (!res.ok) throw data;

      toastSuccess("کاربر با موفقیت ایجاد شد", {
        position: "top-right",
        duration: 3000,
      });

      resetForm();
      setIsOpen(false);
      await mutate("api/user");
    } catch (error: unknown) {
      const errorResponse = error as ErrorResponse;
      toastError(errorResponse.messages.join(", "), {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          کاربر جدید
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl text-start">
            ایجاد کاربر جدید
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-start">
            افزودن کاربر جدید به سیستم
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="space-y-5">
            <div className="relative">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                آدرس ایمیل
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email ?? ""}
                onChange={handleChange}
                placeholder="example@domain.com"
                dir="ltr"
                className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                  errors.email
                    ? "border-destructive"
                    : "border-input hover:border-primary/50"
                }`}
              />
              <div className="min-h-[20px] mt-2">
                {errors.email && (
                  <p className="text-xs text-destructive truncate">
                    لطفاً یک آدرس ایمیل معتبر وارد کنید
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="relative">
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  نام
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={user.firstName ?? ""}
                  onChange={handleChange}
                  placeholder="نام"
                  className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.firstName
                      ? "border-destructive"
                      : "border-input hover:border-primary/50"
                  }`}
                />
                <div className="min-h-[20px] mt-2">
                  {errors.firstName && (
                    <p className="text-xs text-destructive truncate">
                      نام باید حداقل ۲ کاراکتر باشد
                    </p>
                  )}
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  نام خانوادگی
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={user.lastName ?? ""}
                  onChange={handleChange}
                  placeholder="نام خانوادگی"
                  className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.lastName
                      ? "border-destructive"
                      : "border-input hover:border-primary/50"
                  }`}
                />
                <div className="min-h-[20px] mt-2">
                  {errors.lastName && (
                    <p className="text-xs text-destructive truncate">
                      نام خانوادگی باید حداقل ۲ کاراکتر باشد
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 transition-colors"
            >
              ایجاد کاربر
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
