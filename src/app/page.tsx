import Header from "@/components/header/Header";
import MealCard from "@/components/meals/MealCard";
import { MealDoc } from "@/models/Meal";

export default async function HomePage() {
  const { meals }: { meals: MealDoc[] } = await fetch(
    "http://localhost:3000/api/meals",
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  return (
    <div className="container">
      <Header />
      <div className="row align-items-start justify-content-between my-4 vh-100 overflow-scroll p-4 g-4">
        {meals.map((meal) => (
          <div key={meal.id} className="col-12 col-md-6 col-lg-4">
            <MealCard meal={{ ...meal }} />
          </div>
        ))}
      </div>
    </div>
  );
}
