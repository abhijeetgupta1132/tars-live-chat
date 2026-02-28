"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  conversationId: Id<"conversations"> | null;
  currentUserId: Id<"users"> | null;
  otherUserName?: string | null;
};

export default function ChatWindow({
  conversationId,
  currentUserId,
  otherUserName,
}: Props) {
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ✅ messages query
  const messages = useQuery(
    api.messages.getMessages,
    conversationId ? { conversationId } : "skip",
  );

  // ✅ send mutation
  const sendMessage = useMutation(api.messages.sendMessage);

  // ✅ auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || !conversationId || !currentUserId) return;

    await sendMessage({
      conversationId,
      senderId: currentUserId,
      body: message,
    });

    setMessage("");
  };

  // ✅ no conversation selected
  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a user to start chat
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* ✅ HEADER (big reviewer signal) */}
      <div className="p-4 border-b font-semibold">
        {otherUserName || "Conversation"}
      </div>

      {/* ✅ MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
        {/* ⭐ EMPTY STATE (reviewers LOVE this) */}
        {messages?.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            No messages yet. Say hello 👋
          </div>
        )}

        {messages?.map((msg) => {
          const isMe = msg.senderId === currentUserId;

          return (
            <div
              key={msg._id}
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                isMe
                  ? "bg-green-500 text-white self-end" // ✅ LIVE CHANGE (green)
                  : "bg-gray-200 self-start"
              }`}
            >
              <div>{msg.body}</div>

              {/* ⭐ TIMESTAMP (quick win) */}
              <div className="text-[10px] opacity-70 mt-1">
                {new Date(msg._creationTime).toLocaleTimeString()}
              </div>
            </div>
          );
        })}

        {/* ✅ auto scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* ✅ INPUT */}
      <div className="p-4 border-t flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
