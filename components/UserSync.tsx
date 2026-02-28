"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UserSync() {
  const { user } = useUser();

  const existingUser = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : "skip",
  );

  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (!user) return;
    if (existingUser === undefined) return;
    if (existingUser) return; // ✅ prevents duplicates

    createUser({
      clerkId: user.id,
      name: user.fullName ?? "Anonymous",
      email: user.primaryEmailAddress?.emailAddress ?? "",
      image: user.imageUrl,
    });
  }, [user, existingUser, createUser]);

  return null;
}
