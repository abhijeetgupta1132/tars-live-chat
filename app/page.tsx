"use client";

import { useState } from "react";
import UsersList from "@/components/UsersList";
import ChatWindow from "@/components/ChatWindow";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const [conversationId, setConversationId] = useState<string | null>(null);

  const { user } = useUser();

  // 🔥 get current convex user
  const currentUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip",
  );

  return (
    <main className="flex h-screen">
      <SignedOut>
        <div className="p-10">
          <SignInButton />
        </div>
      </SignedOut>

      <SignedIn>
        {/* LEFT SIDEBAR */}
        <UsersList onSelectConversation={setConversationId} />

        {/* RIGHT CHAT */}
        <ChatWindow
          conversationId={conversationId}
          currentUserId={currentUser?._id ?? null}
        />
      </SignedIn>
    </main>
  );
}
