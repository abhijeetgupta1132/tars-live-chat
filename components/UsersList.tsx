"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UsersList() {
  const { user } = useUser();

  const users = useQuery(
    api.users.getUsers,
    user ? { clerkId: user.id } : "skip",
  );

  const createConversation = useMutation(
    api.conversations.createOrGetConversation,
  );

  const me = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip",
  );

  if (!users || !me) {
    return <div className="p-4">Loading users...</div>;
  }

  const handleClick = async (otherUserId: any) => {
    await createConversation({
      userId: me._id,
      otherUserId,
    });

    alert("Conversation ready ✅ (chat UI next)");
  };

  return (
    <div className="p-4 border-r h-screen w-72">
      <h2 className="font-bold mb-4">Users</h2>

      <div className="space-y-2">
        {users.map((u) => (
          <div
            key={u._id}
            onClick={() => handleClick(u._id)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            <div className="font-medium">{u.name}</div>
            <div className="text-xs text-gray-500">{u.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
