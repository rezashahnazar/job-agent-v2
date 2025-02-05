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
import type { User } from "@prisma/client";
export default function UserDelete({
  userToDelete,
  setUserToDelete,
  handleDeleteUser,
}: {
  userToDelete: User | null;
  setUserToDelete: (user: User | null) => void;
  handleDeleteUser: (user: User) => void;
}) {
  return (
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
          <AlertDialogDescription className="space-y-3 text-sm text-start">
            شما در حال حذف حساب کاربری{" "}
            <span className="font-medium text-foreground">
              {userToDelete?.firstName} {userToDelete?.lastName}
            </span>{" "}
            هستید
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="rounded-lg border border-border/50 bg-muted/50 px-4 py-3 text-sm">
          <div className="grid grid-cols-2 divide-x divide-border/50 [&>*]:px-4 first:[&>*]:pr-0 last:[&>*]:pl-4">
            <div className="space-y-1.5 min-w-0">
              <label className="block text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/60">
                ایمیل
              </label>
              <div
                className="font-medium text-sm text-foreground truncate"
                dir="ltr"
                title={userToDelete?.email}
              >
                {userToDelete?.email}
              </div>
            </div>
            <div className="space-y-1.5 min-w-0">
              <label className="block text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/60">
                شناسه کاربر
              </label>
              <div
                className="font-mono text-xs text-muted-foreground/90 truncate"
                dir="ltr"
                title={userToDelete?.id}
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
              <div className="text-sm font-medium">عملیات غیرقابل بازگشت</div>
              <div className="text-xs text-destructive/90">
                این عملیات تمام اطلاعات کاربر را به طور دائمی حذف خواهد کرد و
                قابل بازگشت نیست.
              </div>
            </div>
          </div>
        </div>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="border-muted">انصراف</AlertDialogCancel>
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
  );
}
