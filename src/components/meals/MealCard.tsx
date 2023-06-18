import Link from "next/link";
import Image from "next/image";

import CartIcon from "../../icons/Cart";
import { Meal } from "@models/Meal";
import classes from "./meals.module.scss";

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <div
      className={`card w-100 mx-auto  h-100 ${classes.meal_card}`}
      style={{ maxWidth: "18rem" }}
    >
      <Image
        width={250}
        height={250}
        src={meal.image}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{meal.name}</h5>
        <p className="card-text">{meal.description}</p>
        {/** Can be edited later */}
        {/* <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
        </ul> */}
        <div className="d-flex gap-2 mb-2">
          <span className="fw-bold">Price</span>
          <span>£120</span>
        </div>
        <div className="d-flex justify-content-between">
          <Link href={`/meals/${meal.id}`} className="btn btn-primary">
            View
          </Link>
          <CartIcon />
        </div>
      </div>
    </div>
  );
}
