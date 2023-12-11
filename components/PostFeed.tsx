"use client";

import usePosts from "@/hooks/usePosts";

import PostItem from "@/components/post/PostItem";
import Loading from "@/app/(site)/loading";

interface PostFeedProps {
  userId?: string;
}

export default function PostFeed({ userId }: PostFeedProps) {
  const { data: posts = [], isLoading } = usePosts(userId);

  if (isLoading || !posts) {
    return <Loading />;
  }

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
}
