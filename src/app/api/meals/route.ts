import { mealModel } from "@/container/ClientContainer";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const meals = await mealModel.getAll();
  return NextResponse.json({ meals }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const meal = await req.json();
    console.log("posted data", meal);
    const createdData = await mealModel.create(meal);
    console.log("created data", createdData);
    return NextResponse.json({ status: "success" }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: "faild" }, { status: 405 });
  }
}
