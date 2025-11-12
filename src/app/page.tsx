import { UsersList } from "@/features/users/components";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users Admin</h1>
          <p className="text-muted-foreground">
            Manage and view user information
          </p>
        </div>
        <ThemeToggle />
      </div>
      <UsersList />
    </main>
  );
}
