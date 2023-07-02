"use client";
import useSWR, { Fetcher } from "swr";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import { mealModel } from "@/container/ClientContainer";
import { MealDoc } from "@/models/Meal";
import CheckIcon from "@/icons/Check";

const fetcher: Fetcher<MealDoc, string> = (id: string) =>
  mealModel.findById(id);

export default function MealDetails({ id }: { id: string }) {
  const { addToCart } = useCart();
  const { data, error } = useSWR(id, fetcher);
  if (error) console.log(error);
  return (
    <>
      <div className="card d-block d-md-none m-3 bg-white">
        {data?.image && (
          <Image
            src={data.image}
            className="card-img-top"
            height={300}
            width={300}
            alt={data.name}
          />
        )}

        <div className="card-body bg-white">
          <h5 className="card-title">{data?.name}</h5>
          <div className="bg-primary text-white fw-semibold p-1">
            Description
          </div>
          <p className="card-text">{data?.description}</p>
        </div>
        <div className="bg-white ps-3 hstack">
          <CheckIcon className="text-success" />
          <span>{data?.category}</span>
        </div>
        <div className="text-center fw-semibold fs-5">
          £{data?.price.toFixed(2)}
        </div>
        <div className="card-body bg-white text-center">
          <button onClick={() => addToCart(data!)} className="btn btn-primary">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="d-none d-md-flex container rounded">
        {data?.image && (
          <Image
            className="img-fluid rounded-start-4 w-100"
            src={data.image}
            width={300}
            height={300}
            alt={"meal"}
          />
        )}
        <div className="bg-white  rounded-end-4 w-100 text-center">
          <h2 className="text-primary-emphasis p-4">{data?.name}</h2>
          <div className="d-flex justify-content-center fs-4 mb-4">
            <span className="me-2">
              <CheckIcon className="text-primary-emphasis" />
            </span>
            <span>{data?.category}</span>
          </div>
          <h3 className="text-secondary-emphasis">Description</h3>
          <p>{data?.description}</p>
          <p className="fs-2 ">£{data?.price.toFixed(2)}</p>
          <button
            onClick={() => {
              addToCart(data!);
            }}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div style={{ height: "3rem" }}></div>
    </>
  );
}
