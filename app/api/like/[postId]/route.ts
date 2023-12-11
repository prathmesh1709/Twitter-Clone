import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId;
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    select: {
      id: true,
    },
  });

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "No Post" }),
      { status: 401 }
    );
  }

  const updatedLikedIds = [...(post.likedIds || []), currentUser!.id];

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (post?.userId) {
      await prisma.notification.create({
        data: {
          body: "Someone liked your tweet",
          userId: post.userId,
        },
      });

      await prisma.user.update({
        where: {
          id: post.userId,
        },
        data: {
          hasNotification: true,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likedIds: updatedLikedIds,
    },
  });

  return NextResponse.json(updatedPost);
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId;
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    select: {
      id: true,
    },
  });

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "No Post" }),
      { status: 401 }
    );
  }

  const updatedLikedIds = [...(post.likedIds || [])].filter(
    (likedId) => likedId !== currentUser!.id
  );

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likedIds: updatedLikedIds,
    },
  });

  return NextResponse.json(updatedPost);
}
