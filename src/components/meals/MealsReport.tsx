"use client";

import { clientDB } from "@/container/ClientContainer";
import { useEffect, useState } from "react";

export default function MealsReport() {
  const [mealsCount, setMealsCount] = useState(0);
  useEffect(() => {
    const dispose = clientDB.watch("/meals/", (snap) => {
      setMealsCount(snap.size);
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
