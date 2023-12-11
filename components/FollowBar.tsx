"use client";

import useUsers from "@/hooks/useUsers";
import Avatar from "./Avatar";
import { TailSpin } from "react-loader-spinner";

export default function FollowBar() {
  const { data: users = [], isLoading } = useUsers();

  if (isLoading) {
    return (
      <div className="px-6 py-4 hidden lg:block">
        {/* Background */}
        <div className="bg-neutral-800 rounded-xl p-4">
          {/* Label */}
          <h2 className="text-white text-xl font-semibold">Who to Follow</h2>
          <div className="mt-4">
            <TailSpin
              height="40"
              width="40"
              color="lightblue"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return null;
  }

  return (
    // Container
    <div className="px-6 py-4 hidden lg:block">
      {/* Background */}
      <div className="bg-neutral-800 rounded-xl p-4 sticky top-0">
        {/* Label */}
        <h2 className="text-white text-xl font-semibold">Who to Follow</h2>
        {/* Users List */}
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4 items-center">
              <Avatar userId={user.id} profileImage={user?.profileImage} />
              <div className="flex flex-col ">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
