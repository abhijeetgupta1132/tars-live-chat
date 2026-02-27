import UsersList from "@/components/UsersList";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex">
      <SignedOut>
        <div className="p-10">
          <SignInButton />
        </div>
      </SignedOut>

      <SignedIn>
        <UsersList />
        <div className="flex-1 p-10">Select a user to start chat</div>
      </SignedIn>
    </main>
  );
}
