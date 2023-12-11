"use client";

import { BsTwitter } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function SidebarLogo() {
  const router = useRouter();
  return (
    <div
      className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transitiona-all"
      onClick={() => router.push("/")}
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
}
