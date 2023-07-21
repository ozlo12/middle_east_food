"use client";
import { useRouter } from "next/navigation";
import { mailService } from "@/container/ClientContainer";
import { useToast } from "@/contexts/useToast";
import CheckIcon from "@/icons/Check";
import { useFormik } from "formik";
import {
  EmailField,
  NameField,
  PhoneField,
  textareaFieldTypeGenerator,
} from "./formik-field-generator";
import EnvelopeIcon from "@/icons/Envelope";

const MessageField = textareaFieldTypeGenerator("message")("Message");

export default function ContactUs() {
  const { setContext } = useToast();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    async onSubmit(values) {
      const report = await mailService.contactUsNotification(
        values as ContactUs
      );
      setContext(
        <div className="hstack bg-success-subtle p-2 rounded fw-semibold fs-4">
          <CheckIcon className="text-success" />
          <span>Sent Successfully</span>
        </div>
      );

      router.replace("/");
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <NameField formik={formik} />
      <EmailField formik={formik} />
      <PhoneField formik={formik} />
      <MessageField formik={formik} />
      <div className="text-end">
        <button className="btn btn-primary" disabled={formik.isSubmitting}>
          {formik.isSubmitting && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            />
          )}
          Send
        </button>
      </div>
    </form>
  );
}
