"use client";

import { useSession } from "next-auth/react";

import Header from "@/components/Header";
import { redirect } from "next/navigation";
import NotificationsFeed from "@/components/notifications/NotificationsFeed";

export default function Notifications() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") {
    return (
      <div className="text-white text-center m-4 text-xl">
        Authenticating...
      </div>
    );
  }

  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
}
