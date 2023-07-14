import Header from "@/components/header/Header";
import MealCard from "@/components/meals/MealCard";
import classes from "./layout.module.scss";
import EnvelopeIcon from "@/icons/Envelope";
import { adminDb } from "@/container/ServerContainer";

export const revalidate = 300;

async function getMeals(): Promise<Meal[]> {
  const data = await adminDb.getData("/meals/");
  return adminDb.extractKeys(data.val());
}

export default async function HomePage() {
  const meals = await getMeals();
  return (
    <div className={`container vh-100 overflow-auto ${classes.meals}`}>
      <Header meals={meals} />
      <div className="row g-4 my-4">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="col-12 col-md-6 col-lg-4 col-xl-3 h-100"
          >
            <MealCard meal={meal} />
          </div>
        ))}
      </div>
      <div className="m-2 hstack gap-2 justify-content-center align-items-center">
        <EnvelopeIcon className="text-white" />
        <a
          className="link text-white  fw-semibold"
          href="mailto:zayd@middleeasternfood.co.uk"
        >
          zayd@midddleeasternfood.co.uk
        </a>
      </div>
    </div>
  );
}
