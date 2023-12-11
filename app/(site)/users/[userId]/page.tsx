"use client";

import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import Loading from "@/app/(site)/loading";

export default function UserView({ params }: { params: { userId: string } }) {
  const userId = params.userId;
  const { data: fetchedUser, isLoading } = useUser(userId);

  if (isLoading || !fetchedUser) {
    return <Loading />;
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero fetchedUser={fetchedUser} />
      <UserBio userId={userId} />
      <PostFeed userId={userId} />
    </>
  );
}
