import OrderDetails from "@/components/orders/OrderDetails";
import { orderService } from "@/container/ClientContainer";

export default async function OrderView({
  params: { id },
}: {
  params: { id: string };
}) {
  return <OrderDetails id={id} />;
}
