"use client";
import MealDetails from "@/components/meals/MealDetails";
import { mealModel } from "@/container/ClientContainer";
import CheckIcon from "@/icons/Check";
import { MealDoc } from "@/models/Meal";
import Image from "next/image";

function getMeal(id: string) {
  return mealModel.findById(id);
}

export default async function Meal({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const meal = await getMeal(slug);
  return <MealDetails id={slug} />;
}
