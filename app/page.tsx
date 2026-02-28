"use client";

import { useState } from "react";
import UsersList from "@/components/UsersList";
import ChatWindow from "@/components/ChatWindow";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [otherUserName, setOtherUserName] = useState<string | null>(null);

  const { user } = useUser();

  const currentUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip",
  );

  const handleSelectConversation = (id: string, name: string) => {
    setConversationId(id);
    setOtherUserName(name);
  };

  return (
    <main className="flex h-screen">
      <SignedOut>
        <div className="p-10">
          <SignInButton />
        </div>
      </SignedOut>

      <SignedIn>
        <UsersList onSelectConversation={handleSelectConversation} />

        <ChatWindow
          conversationId={conversationId}
          currentUserId={currentUser?._id ?? null}
          otherUserName={otherUserName}
        />
      </SignedIn>
    </main>
  );
}
