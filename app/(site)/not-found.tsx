"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col gap-6 justify-center items-center">
      <h2 className="text-white text-2xl font-semibold">
        404 | This page could not be found
      </h2>
      <p
        onClick={() => router.push("/")}
        className="text-neutral-400 font-semibold hover:underline"
      >
        View Home
      </p>
    </div>
  );
}
