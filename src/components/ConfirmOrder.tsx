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
  textareaFieldTypeGenerator,
} from "./formik-field-generator";
import Modal from "./widgets/Modal";
import { contactService, orderService } from "@/container/ClientContainer";
import { useCart } from "@/contexts/cart-context";
import CheckIcon from "@/icons/Check";
import { useToast } from "@/contexts/useToast";
import WalletIcon from "@/icons/Wallet";
import CreditCardIcon from "@/icons/CreditCard";

interface FormData
  extends Contact,
    Pick<Order, "extraInformation" | "payment"> {}

const ExtraInformation =
  textareaFieldTypeGenerator("extraInformation")("Extra Information");

export default function ConfirmOrder() {
  const { cart, resetCart } = useCart();
  const { setContext } = useToast();
  const [show, setShow] = useState(false);

  const setContact = (contact: Contact) => {
    return contactService.setContact(contact);
  };

  const createOrder = (formData: FormData) => {
    const { extraInformation, payment, ...contact } = formData;
    if (!cart || cart.items.length < 1)
      throw new Error("No items exist in cart to order");
    return orderService.createOrder({
      cart,
      contact,
      extraInformation,
      payment,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      postcode: "",
      city: "",
      extraInformation: "",
      payment: "cash",
    },

    async onSubmit(values: FormData) {
      try {
        await setContact(values);
        if (cart?.items.length) await createOrder(values);
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
      if (contact)
        formik.setValues({
          ...contact,
          extraInformation: "",
          payment: "cash",
        });
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
          <button
            disabled={formik.isSubmitting}
            onClick={submitForm}
            className="btn btn-primary"
          >
            {formik.isSubmitting && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
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
          <div className="border p-3 rounded mb-4">
            <h6 className="secondary text-start mb-3">Payment</h6>
            <div className="d-flex gap-4 ">
              <div className="form-check">
                <input
                  onChange={formik.handleChange}
                  checked={formik.values.payment === "cash"}
                  value="cash"
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="cash"
                />
                <label className="form-check-label" htmlFor="cash">
                  <WalletIcon /> Cash
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  onChange={formik.handleChange}
                  checked={formik.values.payment === "card"}
                  value="card"
                  type="radio"
                  name="payment"
                  id="card"
                />
                <label className="form-check-label" htmlFor="card">
                  <CreditCardIcon /> Card
                </label>
              </div>
            </div>
          </div>
          <ExtraInformation formik={formik} />
        </form>
        <div className="fw-semibold">
          {/* We Accept <i>Cash</i> and <i>Card</i> on Delivery */}
          <div className="text-center fw-bold">
            <p>Delivery Available and Pickup</p>
            <p className="">
              Your delicious meal will be prepared and ready for you in around
              50 minutes!"
            </p>
          </div>
        </div>
      </Modal>
      <button onClick={() => setShow(true)} className="btn btn-primary">
        Order
      </button>
    </>
  );
}
