import { Contact } from "@/models/User";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function transporter(contact: Contact) {
  return nodemailer.createTransport({
    host: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}
export async function POST(req: Request) {
  try {
    const { contact } = await req.json();
    const report = await transporter(contact).sendMail({
      from: "zayd@middleeasternfood.co.uk",
      to: "zayd@middleeasternfood.co.uk",
      subject: "Order Submitted",
      html: `
            <div>
                <h1>Order Submited</h1>
                <div>From: ${contact.name}</div>
                <div>Address: ${contact.address}</div>
                <div>Postcode: ${contact.postcode}</div>
                <div>City: ${contact.city}</div>
                <div>Phone: ${contact.phone}</div>
            </div>
    `,
    });
    NextResponse.json({
      status: "success",
      message: "Email sent successfully!",
    });
  } catch (err) {
    NextResponse.json({ status: "fail", message: "something went worng " });
  }
}
