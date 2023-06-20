"use client";

import { useFormik } from "formik";
import { useState } from "react";

import {
  AddressField,
  CityField,
  PhoneField,
  PostcodeField,
} from "./formik-field-generator";

export default function ConfirmAddress({
  show,
  closeHandler,
}: {
  show: boolean;
  closeHandler: () => void;
}) {
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
    <div
      style={{ display: show ? "block" : "none" }}
      role="dialog"
      className="modal show fade"
      tabIndex={-1}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Address</h5>
            <button
              onClick={closeHandler}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <AddressField formik={formik} />
            <PostcodeField formik={formik} />
            <CityField formik={formik} />
            <PhoneField formik={formik} />
          </div>
          <div className="modal-footer">
            <button
              onClick={closeHandler}
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
        </div>
      </div>
    </div>
  );
}
