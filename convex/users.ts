import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * 🔍 Get user by Clerk ID
 */
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

/**
 * ➕ Create user (safe version)
 */
export const createUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()), // ✅ IMPORTANT FIX
  },
  handler: async (ctx, args) => {
    // 🔒 prevent duplicate users
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existingUser) {
      return existingUser._id;
    }

    return await ctx.db.insert("users", args);
  },
});

// 👥 Get all users except current user
export const getUsers = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();

    return users.filter((u) => u.clerkId !== args.clerkId);
  },
});
