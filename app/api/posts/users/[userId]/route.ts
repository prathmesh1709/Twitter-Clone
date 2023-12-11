import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ status: "fail", message: error.message }),
      { status: 400 }
    );
  }
}
