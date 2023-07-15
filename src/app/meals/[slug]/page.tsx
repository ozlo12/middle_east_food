// import MealDetails from "@/components/meals/MealDetails";
import AddToCart from "@/components/buttons/AddToCart";
import { adminDb } from "@/container/ServerContainer";
import CheckIcon from "@/icons/Check";
import Image from "next/image";

async function getMeal(id: string): Promise<Meal> {
  const snap = await adminDb.getData("/meals/" + id);
  const meal: Meal = { ...snap.val(), id };
  return meal;
}

export default async function Meal({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const meal = await getMeal(slug);
  return (
    <div style={{ height: "90vh" }} className="container  overflow-auto my-4">
      <div
        style={{ maxWidth: "850px" }}
        className="rounded-3 overflow-hidden mx-auto"
      >
        <Image
          src={meal.image}
          width="0"
          height="0"
          alt={meal.name}
          sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          style={{ height: "auto" }}
          className="w-100"
          placeholder="blur"
          blurDataURL={meal.image}
        />

        <div className="bg-light">
          <div className="text-center d-flex align-items-center justify-content-between p-2">
            <h1 className="text-primary-emphasis">{meal.name}</h1>
            <h4>
              <CheckIcon className="text-success" />
              <span className="text-secondary h5">{meal.category}</span>
            </h4>
          </div>
          <h5 className="bg-primary text-white p-2">Description</h5>
          <p className="p-2 text-secondary">{meal.description}</p>
          <div className="text-center pb-4">
            <div className="my-4 fs-4">£{meal.price}</div>
            <AddToCart meal={meal} />
          </div>
        </div>
      </div>
    </div>
  );
}
