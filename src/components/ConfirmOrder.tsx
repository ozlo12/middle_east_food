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
import { contactService } from "@/container/ClientContainer";

export default function ConfirmOrder() {
  const [initialContact, setInitialContact] = useState<Contact | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    contactService.getContact().then((contact) => {
      setInitialContact(contact);
    });
  }, [null]);

  const createOrder = (contact: Contact) => {
    console.log("Order created to contact: ", contact);
  };

  const isSameContact = (contact: Contact) => {
    if (!initialContact) return false;

    for (const key in contact)
      if (
        contact[key as keyof Contact] !== initialContact[key as keyof Contact]
      )
        return false;

    return true;
  };

  const formik = useFormik({
    initialValues: {
      name: initialContact?.name || "",
      email: initialContact?.email || "",
      phone: initialContact?.phone || "",
      address: initialContact?.address || "",
      postcode: initialContact?.postcode || "",
      city: initialContact?.city || "",
    },

    async onSubmit(values: Contact) {
      if (!initialContact) await contactService.createContact(values);
      else if (!isSameContact(values))
        await contactService.updateContact(values);

      createOrder(values);
    },
  });

  const submitForm = () => {
    formik.submitForm();
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
