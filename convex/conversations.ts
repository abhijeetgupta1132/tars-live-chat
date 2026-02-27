import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ➕ create or get conversation between two users
export const createOrGetConversation = mutation({
  args: {
    userId: v.id("users"),
    otherUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // check if conversation already exists
    const conversations = await ctx.db.query("conversations").collect();

    const existing = conversations.find((c) => {
      if (c.isGroup) return false;

      return (
        c.participants.includes(args.userId) &&
        c.participants.includes(args.otherUserId)
      );
    });

    if (existing) return existing._id;

    // create new conversation
    return await ctx.db.insert("conversations", {
      participants: [args.userId, args.otherUserId],
      isGroup: false,
    });
  },
});
