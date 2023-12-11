import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function POST(req: Request, res: Response) {
  try {
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

    const { body } = (await req.json()) as {
      body: string;
    };

    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser!.id,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ status: "fail", message: error.message }),
      { status: 400 }
    );
  }
}
