"use client";

import useSWR, { mutate } from "swr";
import type { User } from "@prisma/client";
import { useToast } from "@/hook/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UserCreate from "./UserCreate";
import { ErrorResponse } from "@/types/api";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UserList() {
  const { data: response, error, isLoading } = useSWR("api/user", fetcher);
  const { toastSuccess, toastError } = useToast();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleToggleActive = async (user: User) => {
    try {
      const res = await fetch(`api/user/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          isActive: !user.isActive,
        }),
      });

      if (!res.ok) {
        throw await res.json();
      }

      await mutate("api/user");
      toastSuccess(
        `User ${user.isActive ? "deactivated" : "activated"} successfully`,
        {
          position: "top-right",
          duration: 3000,
        }
      );
    } catch (error: unknown) {
      toastError(
        (error as ErrorResponse).messages?.[0] ||
          "Failed to update user status",
        {
          position: "top-right",
          duration: 3000,
        }
      );
    }
  };

  const handleDeleteUser = async (user: User) => {
    try {
      const res = await fetch(`api/user/${user.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw await res.json();
      }

      await mutate("api/user");
      toastSuccess("User deleted successfully", {
        position: "top-right",
        duration: 3000,
      });
    } catch (error: unknown) {
      toastError(
        (error as ErrorResponse).messages?.[0] || "Failed to delete user",
        {
          position: "top-right",
          duration: 3000,
        }
      );
    } finally {
      setUserToDelete(null);
    }
  };

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive">
        خطا در بارگذاری کاربران
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-card/50 p-3 text-sm text-muted-foreground animate-pulse">
        در حال بارگذاری کاربران...
      </div>
    );
  }

  if (!response?.data || response.data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
        کاربری یافت نشد
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="border-b border-border bg-muted/30 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              لیست کاربران
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              مدیریت و نظارت بر حساب‌های کاربری
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground ml-4">
              <span className="font-medium text-foreground">
                {response.data.length}
              </span>{" "}
              کاربر
            </div>
            <UserCreate />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium text-muted-foreground"
              >
                اطلاعات کاربر
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium text-muted-foreground"
              >
                وضعیت
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium text-muted-foreground"
              >
                تاریخ‌ها
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium text-muted-foreground"
              >
                عملیات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {response.data.map((user: User) => (
              <tr
                key={user.id}
                className="group transition-colors hover:bg-muted/30"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-foreground">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {user.email}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground/60 transition-opacity group-hover:opacity-100 opacity-60">
                      {user.id}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleToggleActive(user)}
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
                        user.isActive
                          ? "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20"
                          : "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full ml-2 transition-colors",
                          user.isActive ? "bg-green-500" : "bg-red-500"
                        )}
                      />
                      {user.isActive ? "فعال" : "غیرفعال"}
                    </button>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1.5 text-xs font-medium",
                        user.isEmailVerified
                          ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full ml-2",
                          user.isEmailVerified
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        )}
                      />
                      {user.isEmailVerified ? "تایید شده" : "در انتظار تایید"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="text-muted-foreground">
                      <span className="text-[0.65rem] ml-1 text-muted-foreground/70">
                        ایجاد:
                      </span>
                      {new Date(user.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className="text-muted-foreground/80">
                      <span className="text-[0.65rem] ml-1 text-muted-foreground/70">
                        بروزرسانی:
                      </span>
                      {new Date(user.updatedAt).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setUserToDelete(user)}
                      className="inline-flex items-center rounded-md px-3 py-2 text-xs font-medium 
                        text-muted-foreground hover:text-destructive hover:bg-destructive/10 
                        transition-all duration-200"
                      title="حذف کاربر"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="mr-1.5">حذف</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog
        open={!!userToDelete}
        onOpenChange={() => setUserToDelete(null)}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-destructive"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              حذف حساب کاربری
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <div className="text-sm">
                شما در حال حذف حساب کاربری{" "}
                <span className="font-medium text-foreground">
                  {userToDelete?.firstName} {userToDelete?.lastName}
                </span>{" "}
                هستید
              </div>
              <div className="rounded-lg border border-border/50 bg-muted/50 px-4 py-3 text-sm">
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="text-[0.65rem] uppercase tracking-wider text-muted-foreground/70">
                      ایمیل
                    </label>
                    <div
                      className="font-medium text-muted-foreground"
                      dir="ltr"
                    >
                      {userToDelete?.email}
                    </div>
                  </div>
                  <div>
                    <label className="text-[0.65rem] uppercase tracking-wider text-muted-foreground/70">
                      شناسه کاربر
                    </label>
                    <div
                      className="font-mono text-xs text-muted-foreground/80"
                      dir="ltr"
                    >
                      {userToDelete?.id}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
                <div className="flex gap-2 text-destructive">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 flex-shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      عملیات غیرقابل بازگشت
                    </div>
                    <div className="text-xs text-destructive/90">
                      این عملیات تمام اطلاعات کاربر را به طور دائمی حذف خواهد
                      کرد و قابل بازگشت نیست.
                    </div>
                  </div>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="border-muted">
              انصراف
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => userToDelete && handleDeleteUser(userToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 ml-1.5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clipRule="evenodd"
                />
              </svg>
              حذف حساب
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
