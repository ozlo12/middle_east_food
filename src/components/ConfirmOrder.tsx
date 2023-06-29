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
import Toast from "./widgets/Toast";
import CheckIcon from "@/icons/Check";
import { useToast } from "@/contexts/useToast";

export default function ConfirmOrder() {
  const { cart, resetCart } = useCart();
  const { setContext } = useToast();
  const [show, setShow] = useState(false);

  const setContact = (contact: Contact) => {
    return contactService.setContact(contact);
  };

  const createOrder = (contact: Contact) => {
    if (!cart || cart.items.length < 1)
      throw new Error("No items exist in cart to order");
    return orderService.createOrder(contact, cart);
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
        await resetCart();
        setContext(
          <div className="hstack bg-success-subtle p-2 rounded fw-semibold fs-4">
            <CheckIcon className="text-success" />
            <span>Order Completed Successfully!</span>
          </div>
        );
      } catch (err) {
        // Handle error
        console.log(err instanceof Error ? err.message : err);
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
