"use client";

import useSWR, { mutate } from "swr";
import type { User } from "@prisma/client";
import { useToast } from "@/hook/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import UserCreate from "./UserCreate";
import { ErrorResponse } from "@/types/api";
import UserDelete from "./UserDelete";

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
            <h2 className="text-xl font-semibold text-foreground/70">
              لیست کاربران
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              مدیریت و نظارت بر حساب‌های کاربری
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs text-muted-foreground/80 font-medium ml-4">
              {(response.data.length as number).toLocaleString("fa-IR")} کاربر
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
                className="whitespace-nowrap px-6 py-3 text-end text-xs font-medium text-muted-foreground"
              >
                تاریخ‌ها
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-6 py-3 text-end text-xs font-medium text-muted-foreground"
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
                  <div className="flex flex-col gap-3">
                    <Button
                      onClick={() => handleToggleActive(user)}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "inline-flex items-center gap-1.5 h-6 px-6 text-xs font-medium rounded-full w-fit",
                        user.isActive
                          ? "bg-green-50 text-green-700 border-green-600/20 hover:bg-green-100 hover:text-green-700 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20 dark:hover:bg-green-500/20"
                          : "bg-red-50 text-red-700 border-red-600/20 hover:bg-red-100 hover:text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 dark:hover:bg-red-500/20"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 shrink-0 rounded-full",
                          user.isActive ? "bg-green-500" : "bg-red-500"
                        )}
                      />
                      {user.isActive ? "فعال" : "غیرفعال"}
                    </Button>
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-1 py-0.5 text-xs font-bold",
                        user.isEmailVerified
                          ? "text-green-600/70 dark:text-green-400/70"
                          : "text-yellow-600/70 dark:text-yellow-600/80"
                      )}
                    >
                      <svg
                        className={cn(
                          "size-3",
                          user.isEmailVerified
                            ? "text-green-500/70"
                            : "text-yellow-600/80"
                        )}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 8V12L14 14M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {user.isEmailVerified ? "تایید شده" : "در انتظار تایید"}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col text-end gap-3 text-xs">
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
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      onClick={() => setUserToDelete(user)}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 py-4"
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
                      <span>حذف</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserDelete
        userToDelete={userToDelete}
        setUserToDelete={setUserToDelete}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
}
