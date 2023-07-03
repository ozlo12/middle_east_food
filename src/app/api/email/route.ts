import { Contact } from "@/models/User";
import { NextResponse } from "next/server";

import nodemailer, { TransportOptions } from "nodemailer";

async function sendEamil(contact: Contact) {
  return nodemailer
    .createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    } as TransportOptions)
    .sendMail({
      subject: "Order",
      to: "anasalzaiad@gmail.com",
      // to: "mirooguitar44@gmail.com",
      from: "zayd@middleeasternfood.co.uk",
      html: `
      <h1>Order Recived</h1> 
      <h3>Customer Name: ${contact.name}</h3>
      <h3>Customer Phone: ${contact.phone}</h3>
      <h3>Customer City: ${contact.city}</h3>
      <h3>Customer Address: ${contact.address}</h3>
      <h3>Customer Postcode: ${contact.postcode}</h3>
      `,
    });
}

export async function POST(req: Request) {
  try {
    const { contact } = await req.json();
    const report = await sendEamil(contact);
    return NextResponse.json({ status: "success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({
      status: "fail",
      message: err instanceof Error ? err.message : err,
    });
  }
}
