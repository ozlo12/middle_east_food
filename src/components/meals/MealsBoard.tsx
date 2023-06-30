"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MealDoc } from "@/models/Meal";
import EditIcon from "@/icons/Edit";
import { mealService } from "@/container/ClientContainer";

export default function MealsBoard() {
  const [meals, setMeals] = useState<MealDoc[]>([]);

  useEffect(() => {
    const dispose = mealService.watchMeals((meals: MealDoc[]) => {
      setMeals(meals);
    });
    return dispose;
  }, []);

  return (
    <div className="container my-4 rounded p-5 bg-white mh-100 overflow-auto position-relative">
      <div className="position-absolute top-0 end-0 p-2">
        <Link href="/admin/meals/new" className="btn btn-primary">
          New
        </Link>
      </div>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">edit</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((m, i) => (
            <tr key={i} className="p-4">
              <th scope="row">{i + 1}</th>
              <td>
                <div className="d-flex gap-2 align-items-center">
                  <Image src={m.image} height={40} width={40} alt={m.name} />
                  <span>{m.name}</span>
                </div>
              </td>
              <td>{m.price}</td>
              <td>
                <Link href={`/admin/meals/${m.id}`}>
                  <EditIcon className="text-secondary-emphasis" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
