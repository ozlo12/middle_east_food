"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import classes from "./auth.module.scss";
import {
  AddressField,
  CityField,
  ConfirmPasswordField,
  EmailField,
  NameField,
  PasswordField,
  PhoneField,
  PostcodeField,
  textNameGenerator,
} from "@/components/formik-field-generator";
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";
import AuthGuard from "./AuthGuard";

export default function RegisterForm() {
  const { emailPasswordAuth, authState } = useAuth();
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
      postcode: "",
      city: "",
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
      postcode: Yup.string().required("Postcode is required!"),
      city: Yup.string().required("City/Town is required!"),
      address: Yup.string().required("Address is required"),
    }),

    async onSubmit({ email, password }) {
      try {
        const user = await emailPasswordAuth.signUp(email, password);
        router.replace("/");
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
      }
    },
  });
  return (
    <AuthGuard
      fallback={
        <form
          onSubmit={formik.handleSubmit}
          className={`${classes.register_form}`}
        >
          <div className="border-1 rounded-4 bg-white p-4">
            <NameField formik={formik} />
            <EmailField formik={formik} />
            <PasswordField formik={formik} />
            <ConfirmPasswordField formik={formik} />
            <PhoneField formik={formik} />
            <AddressField formik={formik} />
            <div className="row ">
              <div className="col-12 col-sm-6">
                <PostcodeField formik={formik} />
              </div>
              <div className="col-12 col-sm-6">
                <CityField formik={formik} />
              </div>
            </div>
            <div className="d-flex justify-content-end ">
              <button className="btn btn-warning me-4">Rest</button>
              <button className="btn btn-primary">Regsiter</button>
            </div>
            <Link href="/login">Have account already?</Link>
          </div>
        </form>
      }
    >
      ...loading
    </AuthGuard>
  );
}
