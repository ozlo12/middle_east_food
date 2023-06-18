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
      <div className="form-floating mb-3">
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
        <div className="invalid-feedback">{formik.errors[fieldName]}</div>
      </div>
    );

export const emailNameGenerator = inputFieldTypeGenerator("email");
export const passwordNameGenerator = inputFieldTypeGenerator("password");
export const textNameGenerator = inputFieldTypeGenerator("text");

export const emailTitleGenerator = emailNameGenerator("email");
export const passwordTitleGenerator = passwordNameGenerator("password");
export const confirmPasswordTitleGenerator =
  passwordNameGenerator("confirmPassword");
export const nameTitleGenerator = textNameGenerator("name");
export const phoneTitleGenerator = textNameGenerator("phone");
export const addressTitleGenerator = textNameGenerator("address");

export const NameField = nameTitleGenerator("Name");
export const EmailField = emailTitleGenerator("Email");
export const PasswordField = passwordTitleGenerator("Password");
export const ConfirmPasswordField =
  confirmPasswordTitleGenerator("Confirm Password");
export const PhoneField = phoneTitleGenerator("Phone");
export const AddressField = addressTitleGenerator("Address");
