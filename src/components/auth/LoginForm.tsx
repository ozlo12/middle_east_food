"use client";
import Link from "next/link";
import { useFormik, validateYupSchema } from "formik";
import classes from "./auth.module.scss";

export default function LoginForm() {
  const {
    values: { email, password },
    handleChange,
    errors,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit({ email, password }) {
      console.log(email, password);
    },
  });
  return (
    <form className={classes.login_form}>
      <div className="border-1 rounded-4 bg-white p-4">
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingEmail">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            name="password"
            onChange={handleChange}
            value={password}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
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
