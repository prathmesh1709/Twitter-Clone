import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const postId = params.postId;

    if (!postId || typeof postId !== "string") {
      return new NextResponse(
        JSON.stringify({ status: "fail", message: "Invalid PostID" }),
        { status: 401 }
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ status: "fail", message: error.message }),
      { status: 401 }
    );
  }
}
