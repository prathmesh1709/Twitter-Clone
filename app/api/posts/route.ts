export const dynamic = "force-dynamic";
export const revalidate = 5;

import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
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
