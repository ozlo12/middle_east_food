"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import classes from "./auth.module.scss";
import {
  AddressField,
  ConfirmPasswordField,
  EmailField,
  NameField,
  PasswordField,
  PhoneField,
} from "@components/formik-field-generator";
import { useAuth } from "../../contexts/auth.context";
import { useEffect } from "react";

export default function RegisterForm() {
  const { signup, authState } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authState) router.replace("/");
  }, [authState]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required!"),
      email: Yup.string()
        .email("Not valid email!")
        .required("Email is required!"),
      password: Yup.string()
        .required("Password is required!")
        .min(8, "Password is too short!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")])
        .required("Confirm password is required!"),
      phone: Yup.string().required("Phone is required!"),
      address: Yup.string().required("Address is required"),
    }),

    async onSubmit({ email, password }) {
      try {
        const user = await signup(email, password);
        router.replace("/");
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={`${classes.register_form}`}>
      <div className="border-1 rounded-4 bg-white p-4">
        <NameField formik={formik} />
        <EmailField formik={formik} />
        <PasswordField formik={formik} />
        <ConfirmPasswordField formik={formik} />
        <PhoneField formik={formik} />
        <AddressField formik={formik} />
        <div className="d-flex justify-content-end ">
          <button className="btn btn-warning me-4">Rest</button>
          <button className="btn btn-primary">Regsiter</button>
        </div>
        <Link href="/login">Have account already?</Link>
      </div>
    </form>
  );
}
