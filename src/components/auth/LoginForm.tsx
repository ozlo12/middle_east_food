"use client";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import classes from "./auth.module.scss";
import { EmailField, PasswordField } from "@components/formik-field-generator";

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required!"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password too short!"),
    }),
    onSubmit({ email, password }) {
      console.log(email, password);
    },
  });
  return (
    <form className={`${classes.login_form} needs-validation`} noValidate>
      <div className="border-1 rounded-4 bg-white p-4">
        <EmailField formik={formik} />
        <PasswordField formik={formik} />
        <div className="d-flex flex-row-reverse justify-content-between">
          <button type="submit" className="btn btn-primary">
            login
          </button>
          <Link href="/register">Register new account?</Link>
        </div>
      </div>
    </form>
  );
}
