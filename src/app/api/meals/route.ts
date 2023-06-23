import { mealModel } from "@/container/ClientContainer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const meals = await mealModel.getAll();
  return NextResponse.json({ meals }, { status: 200 });
}
