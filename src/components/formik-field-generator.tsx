import { FormikErrors, FormikTouched, FormikValues } from "formik";

interface ExtendableProps {
  handleChange: any;
  handleBlur: any;
  touched: FormikTouched<any>;
  errors: FormikErrors<{ [ind: string]: string | undefined }>;
  values: FormikValues;
}

export const inputFieldTypeGenerator =
  (fieldType: string = "text") =>
  (fieldName: string) =>
  (title: string) =>
  ({ formik }: { formik: ExtendableProps }) =>
    (
      <div style={{ marginBottom: "2rem" }} className="form-floating">
        <input
          type={fieldType}
          name={fieldName}
          value={formik.values[fieldName]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-control ${
            formik.errors[fieldName]
              ? "is-invalid"
              : formik.touched[fieldName]
              ? "is-valid"
              : ""
          }`}
          id={fieldName}
          placeholder={title}
        />
        <label htmlFor={fieldName}>{title}</label>
        <div className="invalid-feedback position-absolute">
          {formik.errors[fieldName]}
        </div>
      </div>
    );

export const emailNameGenerator = inputFieldTypeGenerator("email");
export const passwordNameGenerator = inputFieldTypeGenerator("password");
export const textNameGenerator = inputFieldTypeGenerator("text");

export const NameField = textNameGenerator("name")("Name");
export const EmailField = emailNameGenerator("email")("Email");
export const ConfirmPasswordField =
  passwordNameGenerator("confirmPassword")("Confirm Password");
export const PasswordField = passwordNameGenerator("password")("Password");
export const PhoneField = textNameGenerator("phone")("Phone");
export const AddressField = textNameGenerator("address")("Address");
export const PostcodeField = textNameGenerator("postcode")("Postcode");
export const CityField = textNameGenerator("city")("City/Town");
