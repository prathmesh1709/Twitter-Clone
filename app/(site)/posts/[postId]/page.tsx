"use client";

import usePost from "@/hooks/usePost";
import Loading from "@/app/(site)/loading";
import Header from "@/components/Header";
import PostItem from "@/components/post/PostItem";
import Form from "@/components/Form";
import CommentFeed from "@/components/post/CommentFeed";

export default function PostView({ params }: { params: { postId: string } }) {
  const postId = params.postId;

  const { data: fetchedPost, isLoading } = usePost(postId);

  if (isLoading || !fetchedPost) {
    return <Loading />;
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form postId={postId} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
}
