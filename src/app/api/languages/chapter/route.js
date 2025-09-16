import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const id = Number(body.languageId);
  const question = await prisma.Chapter.create({
    data: {
      title:body.title,
      languageId:id,
    },
  });
  return NextResponse.json(question);
}
