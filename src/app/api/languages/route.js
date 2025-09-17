import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const languages = await prisma.language.findMany();
    return NextResponse.json(languages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    return NextResponse.json({ error: "Failed to fetch languages" }, { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const question = await prisma.Language.create({
    data: {
      name:body.name,
    },
  });
  return NextResponse.json(question);
}
