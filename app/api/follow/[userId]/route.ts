import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
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
      followingIds: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      followingIds: true,
    },
  });

  const updatedFollingIds = [...(user?.followingIds || []), userId];

  try {
    await prisma.notification.create({
      data: {
        body: "Someone followed you",
        userId,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: true,
      },
    });
  } catch (error) {
    console.log(error);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser!.id,
    },
    data: {
      followingIds: updatedFollingIds,
    },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
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
      followingIds: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      followingIds: true,
    },
  });

  const updatedFollingIds = [...(user?.followingIds || [])].filter(
    (followingId) => followingId !== userId
  );

  const updatedUser = await prisma.user.update({
    where: {
      id: currentUser!.id,
    },
    data: {
      followingIds: updatedFollingIds,
    },
  });

  return NextResponse.json(updatedUser);
}
