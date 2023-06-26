"use client";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import classes from "./auth.module.scss";
import { EmailField, PasswordField } from "@/components/formik-field-generator";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authService } from "@/container/ClientContainer";

export default function LoginForm() {
  const { auth, user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user?.providerData.length) router.replace("/");
  }, [user]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      status: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required!"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password too short!"),
    }),
    async onSubmit({ email, password }) {
      try {
        const user = await authService.emailAuth.signIn(email, password);
        router.replace("/");
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
        formik.setErrors({ status: "Wrong email or password try again!" });
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`${classes.login_form} needs-validation`}
      noValidate
    >
      <div className="border-1 rounded-4 bg-white p-4">
        <EmailField formik={formik} />
        <PasswordField formik={formik} />
        <div className="d-flex flex-row-reverse justify-content-between">
          <button type="submit" className="btn btn-primary">
            login
          </button>
          <Link href="/register">Register new account?</Link>
        </div>
        {formik.errors.status && (
          <p className="text-danger">{formik.errors.status}</p>
        )}
      </div>
    </form>
  );
}
