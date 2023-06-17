import Header from "../components/header/Header";
import meals from "../../data/meals.json";
import MealCard from "../components/meals/MealCard";
export default function () {
  const myMeals = meals;
  return (
    <div className="container">
      <Header />
      <div className="row justify-content-between my-4 vh-100 overflow-scroll p-4 g-4">
        {meals.map((meal) => (
          <div key={meal.id} className="col-12 col-md-6 col-lg-4">
            <MealCard meal={{ ...meal }} />
          </div>
        ))}
      </div>
    </div>
  );
}
