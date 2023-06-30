"use client";
import MealDetails from "@/components/meals/MealDetails";
import { mealModel } from "@/container/ClientContainer";
import CheckIcon from "@/icons/Check";
import { MealDoc } from "@/models/Meal";
import Image from "next/image";

function getMeal(id: string) {
  return mealModel.findById(id);
}

export default async function Meal({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const meal = await getMeal(slug);
  return (
    <MealDetails id={slug} />
    // <>
    //   <div className="card d-block d-md-none m-3 bg-secondary-subtle">
    //     <Image
    //       src={meal.image}
    //       className="card-img-top"
    //       height={300}
    //       width={300}
    //       alt={meal.name}
    //     />
    //     <div className="card-body bg-secondary-subtle">
    //       <h5 className="card-title">Card title</h5>
    //       <p className="card-text">
    //         Some quick example text to build on the card title and make up the
    //         bulk of the card's content.
    //       </p>
    //     </div>
    //     <div className="bg-secondary-subtle ps-3">
    //       <p>item1</p>
    //       <p>item1</p>
    //       <p>item1</p>
    //     </div>
    //     <div className="text-center fw-semibold fs-5">Price $23</div>
    //     <div className="card-body bg-secondary-subtle text-center">
    //       <button className="btn btn-primary">Add to Cart</button>
    //     </div>
    //   </div>

    //   <div className="d-none d-md-flex container rounded">
    //     <Image
    //       className="img-fluid rounded-start-4 w-100"
    //       src={meal.image}
    //       width={300}
    //       height={300}
    //       alt={"meal"}
    //     />
    //     <div className="bg-secondary-subtle rounded-end-4 w-100 text-center">
    //       <h2 className="text-primary-emphasis p-4">{meal.name}</h2>
    //       <div className="d-flex justify-content-center fs-4 mb-4">
    //         <span className="me-2">
    //           <CheckIcon className="text-primary-emphasis" />
    //         </span>
    //         <span>{meal.category}</span>
    //       </div>
    //       <h3 className="text-secondary-emphasis">Description</h3>
    //       <p>{meal.description}</p>
    //       <p className="fs-2 ">$32</p>
    //       <button onClick={() => {}} className="btn btn-primary">
    //         Add to Cart
    //       </button>
    //     </div>
    //   </div>
    //   <div style={{ height: "3rem" }}></div>
    // </>
  );
}
