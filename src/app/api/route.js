import { NextResponse } from "next/server";

export default async function GET(req) {
    return NextResponse.json({"message":"hello workd"});
}