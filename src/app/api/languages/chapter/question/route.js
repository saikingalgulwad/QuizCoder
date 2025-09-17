import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function GET(req) {
  try {
    const url = new URL(req.url);
    const chapterId = Number(url.searchParams.get("chapterId"));

    const questions = await prisma.question.findMany({
      where: { chapterId },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const body = await req.json();

    const question = await prisma.question.create({
      data: {
        question: body.question,
        options: body.options, // must be an array
        answer: body.answer,
        chapterId: body.chapterId, // must match an existing Chapter
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
