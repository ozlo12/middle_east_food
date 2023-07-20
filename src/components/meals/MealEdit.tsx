"use client";

// import { MealDoc } from "@/models/Meal";
import { useFormik } from "formik";
import MealCard from "./MealCard";
import {
  inputFieldTypeGenerator,
  NameField,
  textNameGenerator,
} from "../formik-field-generator";
import Link from "next/link";
import { clientDB /*mealModel*/ } from "@/container/ClientContainer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../widgets/Modal";

const DescriptionField = textNameGenerator("description")("Description");
const CategoriesField = textNameGenerator("category")("Category");
const ImageField = textNameGenerator("image")("Image");
const PriceField = inputFieldTypeGenerator("number")("price")("Price");

export default function MealEdit({ meal }: { meal?: Meal }) {
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: meal?.name || "",
      price: meal?.price || 0,
      description: meal?.description || "",
      category: meal?.category || "",
      image: meal?.image || "",
    },

    // Save/Overwrite meal.
    async onSubmit(values) {
      try {
        // if (meal) await mealModel.updateById(meal.id!, values);
        if (meal) await clientDB.updateData("/meals/" + meal.id, values);
        // await mealModel.create({
        //   ...values,
        //   createdAt: new Date().toISOString(),
        // });
        else
          await clientDB.pushData("/meals/", {
            ...values,
            createdAt: new Date().toISOString(),
          });

        router.back();
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
        else console.log(err);
      }
    },
  });

  const onDelete = async () => {
    if (meal && meal.id) {
      // mealModel.deleteById(meal.id);
      await clientDB.deleteData("/meals/" + meal.id);
      router.back();
    }
  };

  return (
    <>
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
            {meal && (
              <button
                type="button"
                onClick={() => {
                  setShowModal(true);
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
            )}
            <Link href={"/admin/meals"} className="btn border-primary-subtle">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>

      <Modal
        title="Delete Meal"
        action={
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        }
        closeHandler={() => setShowModal(false)}
        show={showModal}
      >
        <p>Are you sure, delete meal?</p>
      </Modal>
    </>
  );
}
