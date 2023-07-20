import { mailServerService } from "@/container/ServerContainer";
import { NextResponse } from "next/server";
import OrderTemplate from "./OrderTemplate";

async function orderRenderer(order: Order) {
  const { renderToStaticMarkup } = await import("react-dom/server");
  return renderToStaticMarkup(OrderTemplate({ order }));
}

export async function POST(req: Request) {
  const order = await req.json();
  try {
    const html = await orderRenderer(order);
    await mailServerService.sendMail("New Order", html);
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
