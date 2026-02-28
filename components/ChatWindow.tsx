"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

type Props = {
  conversationId: any;
  currentUserId: any;
};

export default function ChatWindow({ conversationId, currentUserId }: Props) {
  const [message, setMessage] = useState("");

  const messages = useQuery(
    api.messages.getMessages,
    conversationId ? { conversationId } : "skip",
  );

  const sendMessage = useMutation(api.messages.sendMessage);

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a user to start chat
      </div>
    );
  }

  const handleSend = async () => {
    if (!message.trim() || !currentUserId) return;

    await sendMessage({
      conversationId,
      senderId: currentUserId,
      body: message,
    });

    setMessage("");
  };

  return (
    <div className="flex flex-col h-full flex-1">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded w-fit max-w-xs ${
              msg.senderId === currentUserId
                ? "ml-auto bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {msg.body}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
