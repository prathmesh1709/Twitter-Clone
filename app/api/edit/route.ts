import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function PATCH(req: Request, res: Response) {
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
    });

    const { name, username, bio, profileImage, coverImage } =
      (await req.json()) as {
        name: string;
        username: string;
        bio: string;
        profileImage: string;
        coverImage: string;
      };

    if (!name || !username) {
      return new Error("Missing Fields");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser!.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
