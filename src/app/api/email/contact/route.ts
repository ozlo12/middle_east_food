import { NextResponse } from "next/server";
import ContactTemplate from "./ContactTemplate";

async function contentRenderer(contactUs: ContactUs) {
  const { renderToStaticMarkup } = await import("react-dom/server");
  return renderToStaticMarkup(ContactTemplate({ contactUs }));
}
export async function POST(req: Request) {
  const contactUs: ContactUs = await req.json();
  const markup = await contentRenderer(contactUs);

  return NextResponse.json({ html: markup });
}
