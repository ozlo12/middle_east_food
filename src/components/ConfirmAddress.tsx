"use client";

import { useFormik } from "formik";
import { useState } from "react";

import {
  AddressField,
  CityField,
  PhoneField,
  PostcodeField,
} from "./formik-field-generator";
import Modal from "./widgets/Modal";

export default function ConfirmAddress() {
  const formik = useFormik({
    initialValues: {
      address: "24 Dervin St London",
      phone: "4923238",
      postcode: "4323",
      city: "London",
    },
    onSubmit() {},
  });
  return (
    <Modal
      title="Order Confirm"
      closeHandler={() => {}}
      show={true}
      action={<button></button>}
    >
      <form>
        <AddressField formik={formik} />
        <PostcodeField formik={formik} />
        <CityField formik={formik} />
        <PhoneField formik={formik} />
        <div>
          <button
            onClick={() => {}}
            type="button"
            className="btn bg-secondary-subtle"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  );
}
