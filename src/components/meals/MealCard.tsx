import Link from "next/link";
import Image from "next/image";

import { MealDoc } from "@/models/Meal";
import classes from "./meals.module.scss";
import { CartButton } from "@/components/buttons/CartButton";

export default function MealCard({ meal }: { meal: MealDoc }) {
  return (
    <div
      className={`card w-100 mx-auto h-100  ${classes.meal_card}`}
      style={{ maxWidth: "18rem" }}
    >
      <Image
        src={meal.image}
        width={250}
        height={250}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{meal.name}</h5>
        <p className="card-text">{meal.description}</p>
        <div className="d-flex gap-2 mb-2">
          <span className="fw-bold">Price</span>
          <span>£{meal.price}</span>
        </div>
        <div className="d-flex justify-content-between">
          <Link href={`/meals/${meal.id}`} className="btn btn-primary">
            View
          </Link>
          <CartButton />
        </div>
      </div>
    </div>
  );
}
