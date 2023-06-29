"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";

import {
  AddressField,
  CityField,
  EmailField,
  NameField,
  PhoneField,
  PostcodeField,
} from "./formik-field-generator";
import Modal from "./widgets/Modal";
import { Contact } from "@/models/User";
import { contactService, orderService } from "@/container/ClientContainer";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";

export default function ConfirmOrder() {
  const { cart } = useCart();

  const [show, setShow] = useState(false);

  const setContact = (contact: Contact) => {
    return contactService.setContact(contact);
  };

  const createOrder = (contact: Contact) => {
    console.log("Order processing to contact: ", contact);
    return Promise.resolve();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      postcode: "",
      city: "",
    },

    async onSubmit(values: Contact) {
      try {
        await setContact(values);
        await createOrder(values);
      } catch (err) {
        // Handle error
      }
    },
  });

  useEffect(() => {
    contactService.getContact().then((contact: Contact | null) => {
      if (contact) formik.setValues(contact);
    });
  }, [null]);

  const submitForm = async () => {
    await formik.submitForm();
    setShow(false);
  };
  return (
    <>
      <Modal
        title="Order Confirm"
        closeHandler={() => setShow(false)}
        show={show}
        action={
          <button onClick={submitForm} className="btn btn-primary">
            Confirm
          </button>
        }
      >
        <form>
          <NameField formik={formik} />
          <EmailField formik={formik} />
          <AddressField formik={formik} />
          <PostcodeField formik={formik} />
          <CityField formik={formik} />
          <PhoneField formik={formik} />
        </form>
      </Modal>
      <button onClick={() => setShow(true)} className="btn btn-primary">
        Order
      </button>
    </>
  );
}
