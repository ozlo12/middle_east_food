"use client";

import { MealDoc } from "@/models/Meal";
import { useFormik } from "formik";
import MealCard from "./MealCard";
import { NameField, textNameGenerator } from "../formik-field-generator";
import Link from "next/link";
import { mealModel } from "@/container/ClientContainer";

const DescriptionField = textNameGenerator("description")("Description");
const CategoriesField = textNameGenerator("categories")("Categories");
const ImageField = textNameGenerator("image")("Image");
const PriceField = textNameGenerator("price")("Price");

export default function MealEdit({ meal }: { meal?: MealDoc }) {
  const formik = useFormik({
    initialValues: {
      name: meal?.name || "",
      price: meal?.price || 0,
      description: meal?.description || "",
      categories: meal?.categories || "",
      image: meal?.image || "",
    },

    // Save/Overwrite meal.
    async onSubmit(values) {
      // fetch("/api/meals", {
      //   method: "POST",
      //   body: JSON.stringify(values),
      // });
      try {
        const res = await mealModel.create({ ...meal!, ...values });
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
        else console.log(err);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <MealCard meal={{ ...meal!, ...formik.values }} />
        </div>
        <div className="col-12 col-md-6">
          <NameField formik={formik} />
          <ImageField formik={formik} />
          <PriceField formik={formik} />
          <DescriptionField formik={formik} />
          <CategoriesField formik={formik} />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div></div>
        <div className="hstack gap-2 g-2">
          {meal && <button className="btn btn-danger">Delete</button>}
          <Link href={"/admin/meals"} className="btn border-primary-subtle">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
