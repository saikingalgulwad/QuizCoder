import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const question = await prisma.Language.create({
    data: {
      name:body.name,
    },
  });
  return NextResponse.json(question);
}
