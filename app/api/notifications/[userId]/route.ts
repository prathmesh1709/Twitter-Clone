import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    if (!userId || typeof userId !== "string") {
      return new NextResponse(
        JSON.stringify({ status: "fail", message: "Invalid ID" }),
        { status: 400 }
      );
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hasNotification: false,
      },
    });

    return NextResponse.json(notifications);
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: error.message }),
      { status: 400 }
    );
  }
}
