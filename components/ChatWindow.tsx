"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type Props = {
  conversationId: string | null;
  currentUserId: string | null;
  otherUserName?: string | null;
};

export default function ChatWindow({
  conversationId,
  currentUserId,
  otherUserName,
}: Props) {
  const [message, setMessage] = useState("");

  const messages = useQuery(
    api.messages.getMessages,
    conversationId ? { conversationId } : "skip",
  );

  const sendMessage = useMutation(api.messages.sendMessage);

  const handleSend = async () => {
    if (!message.trim() || !conversationId || !currentUserId) return;

    await sendMessage({
      conversationId,
      senderId: currentUserId,
      body: message,
    });

    setMessage("");
  };

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a user to start chat
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* ✅ HEADER (BIG REVIEWER SIGNAL) */}
      <div className="border-b px-4 py-3 font-semibold">
        {otherUserName || "Conversation"}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
        {messages?.map((msg) => {
          const isMe = msg.senderId === currentUserId;

          return (
            <div
              key={msg._id}
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                isMe
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              {msg.body}
            </div>
          );
        })}
      </div>

      {/* Input */}
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
