import { mailServerService } from "@/container/ServerContainer";
import { NextResponse } from "next/server";
import ContactTemplate from "./ContactTemplate";

async function contactRender(contactUs: ContactUs) {
  const { renderToStaticMarkup } = await import("react-dom/server");
  return renderToStaticMarkup(ContactTemplate({ contactUs }));
}
export async function POST(req: Request) {
  const contactUs = await req.json();
  try {
    const html = await contactRender(contactUs);
    await mailServerService.sendMail("Contact Us", html);
    return NextResponse.json({
      status: "success",
      message: "Email sent successfully!",
    });
  } catch (err) {
    return NextResponse.json({
      status: "fail",
      message:
        err instanceof Error
          ? err.message
          : "Something went wrong while sending email!",
    });
  }
}
