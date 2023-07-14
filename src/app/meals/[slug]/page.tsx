"use client";
import MealDetails from "@/components/meals/MealDetails";
import { adminDb } from "@/container/ServerContainer";
// import { mealModel } from "@/container/ClientContainer";
// import CheckIcon from "@/icons/Check";
// import { MealDoc } from "@/models/Meal";
// import Image from "next/image";

async function getMeal(id: string): Promise<Meal> {
  const snap = await adminDb.getData("/meals/" + id);
  const meal: Meal = { ...snap.val(), id };
  return meal;
}

export default async function Meal({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // const meal = getMeal(slug)
  return <MealDetails id={slug} />;
}
