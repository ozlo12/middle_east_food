import MealEdit from "@/components/meals/MealEdit";
import { adminDb } from "@/container/ServerContainer";

export const revalidate = 0;
async function getMeal(id: string) {
  // return mealModel.findById(id);
  const meal = (await adminDb.getData("/meals/" + id)).val() as Meal;
  if (meal) meal.id = id;
  return meal;
}
export default async function MealItem({
  params: { id },
}: {
  params: { id: string };
}) {
  const meal = id === "new" ? undefined : await getMeal(id);

  return (
    <div className="vh-100">
      <div className="container bg-white rounded p-4">
        <h2 className="text-center text-primary-emphasis mb-4">
          {id === "new" ? "Create Meal" : "Edit Meal"}
        </h2>
        <MealEdit meal={meal} />
      </div>
    </div>
  );
}
