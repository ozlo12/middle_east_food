import MealEdit from "@/components/meals/MealEdit";
import { MealDoc } from "@/models/Meal";

// const dashboardFetcher = async <T = any,>(docName: string) => {
//   return fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/" + docName, {
//     cache: "no-store",
//   }).then((res) => res.json()) as Promise<T>;
// };

export default async function MealItem({
  params: { id },
}: {
  params: { id: string };
}) {
  // let meal: MealDoc | undefined;
  // if (id !== "new") meal = (await dashboardFetcher("meals/" + id)).meal;
  const meal = undefined;
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
