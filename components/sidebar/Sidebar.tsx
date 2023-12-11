"use client";

import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";

import { signOut } from "next-auth/react";
import useSession from "@/hooks/useSession";

export default function Sidebar() {
  const { data: currentUser } = useSession();
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className="pr-4 md:pr-6 col-span-1">
      <aside className="h-screen sticky top-0">
        {/* Items Alignment */}
        <div className="flex flex-col items-end ">
          {/* Gap between elements & max width */}
          <div className="space-y-2 lg:w-[230px] mt-2">
            <SidebarLogo />

            {/* Links */}
            {items.map((item) => (
              <SidebarItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                auth={item.auth}
                alert={item.alert}
              />
            ))}

            {/* Auth Buttons */}
            {currentUser && (
              <SidebarItem
                onClick={() => signOut()}
                icon={BiLogOut}
                label="Logout"
              />
            )}

            {/* Tweet Button */}
            <SidebarTweetButton />
          </div>
        </div>
      </aside>
    </div>
  );
}
