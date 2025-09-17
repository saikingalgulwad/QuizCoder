import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const languageId = Number(url.searchParams.get("languageId"));

    const chapters = await prisma.chapter.findMany({
      where: { languageId },
    });

    return NextResponse.json(chapters);
  } catch (error) {
    console.error("Failed to fetch chapters:", error);
    return NextResponse.json({ error: "Failed to fetch chapters" }, { status: 500 });
  }
}

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
