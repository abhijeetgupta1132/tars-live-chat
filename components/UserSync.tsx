"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UserSync() {
  const { user } = useUser();

  // 🔍 check if user already exists
  const existingUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip",
  );

  // ➕ create user mutation
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    // wait until Clerk loads
    if (!user) return;

    // wait until query finishes
    if (existingUser === undefined) return;

    // ✅ ONLY create if user does not exist
    if (!existingUser) {
      createUser({
        clerkId: user.id,
        name: user.fullName ?? "Anonymous",
        email: user.primaryEmailAddress?.emailAddress ?? "",
        image: user.imageUrl ?? "",
      });
    }
  }, [user, existingUser, createUser]);

  return null;
}
