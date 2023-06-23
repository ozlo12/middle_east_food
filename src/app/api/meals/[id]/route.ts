import { mealModel } from "@/container/ClientContainer";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const meal = await mealModel.findById(id);

  return NextResponse.json({ meal }, { status: 200 });
}
