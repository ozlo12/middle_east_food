"use client";

import { mealService } from "@/container/ClientContainer";
import { useEffect, useState } from "react";

export default function MealsReport() {
  const [mealsCount, setMealsCount] = useState(0);
  useEffect(() => {
    const dispose = mealService.watchMeals((meals) => {
      setMealsCount(meals.length);
    });
    return dispose;
  }, []);

  return (
    <div>
      <h3>Meals</h3>
      <h5>Total Meals: {mealsCount}</h5>
    </div>
  );
}
