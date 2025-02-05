import UserList from "@/components/user/UserList";
import UserCreate from "@/components/user/UserCreate";

export default function Home() {
  return (
    <main className="min-h-dvh bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-4xl space-y-6">
            <UserCreate />
            <UserList />
          </div>
        </div>
      </div>
    </main>
  );
}
