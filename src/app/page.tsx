import Header from "@/components/header/Header";
import MealCard from "@/components/meals/MealCard";
import { mealModel } from "@/container/ClientContainer";
import { MealDoc } from "@/models/Meal";
export const revalidate = 60;
async function getMeals(): Promise<MealDoc[]> {
  return await mealModel.getAll();
}
export default async function HomePage() {
  const meals = await getMeals();

  return (
    <div className="container vh-100 overflow-scroll">
      <Header />
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
    </div>
  );
}
