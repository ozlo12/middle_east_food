import { NextResponse } from "next/server";
import OrderTemplate from "./OrderTemplate";

async function orderRenderer(order: Order) {
  const { renderToStaticMarkup } = await import("react-dom/server");
  return renderToStaticMarkup(OrderTemplate({ order }));
}

export async function POST(req: Request) {
  const order = await req.json();

  const html = await orderRenderer(order);
  return NextResponse.json({ html });
}
