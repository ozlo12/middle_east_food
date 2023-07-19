import CreditCardIcon from "@/icons/CreditCard";
import WalletIcon from "@/icons/Wallet";
import EmailLayout, { Card, SideTitle, Title } from "../EmailLayout";

const contactKeys: (keyof Contact)[] = [
  "name",
  "email",
  "phone",
  "address",
  "city",
  "postcode",
];
export default function OrderTemplate({ order }: { order: Order }) {
  return (
    <EmailLayout>
      <Title>New Order</Title>
      <SideTitle>Customer Information:</SideTitle>
      <br />
      <Card>
        <table style={{ width: "100%" }}>
          {contactKeys.map((k) => (
            <tr key={k}>
              <td style={{ textAlign: "left" }}>
                {k[0].toUpperCase() + k.slice(1)}
              </td>
              <td style={{ textAlign: "right" }}>{order.contact[k]}</td>
            </tr>
          ))}
        </table>
      </Card>
      <br />
      <SideTitle>Cart:</SideTitle>
      <br />
      <Card>
        <table style={{ width: "100%" }}>
          <thead>
            <th>#</th>
            <th style={{ textAlign: "left" }}>Name</th>
            <th style={{ textAlign: "center" }}>Count</th>
            <th style={{ textAlign: "right" }}>Price</th>
          </thead>
          {order.cart.items.map(({ item, quantity }, i) => (
            <tr key={item.id}>
              <td style={{ textAlign: "left" }}>{i + 1}</td>
              <td align="left">
                <table>
                  <tr>
                    <td>
                      <img width="40" src={item.image} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                  </tr>
                </table>
              </td>
              <td style={{ textAlign: "center" }}>{quantity}</td>
              <td style={{ textAlign: "right" }}>£{item.price}</td>
            </tr>
          ))}
          <tr>
            <th style={{ textAlign: "center" }} colSpan={2}>
              Total
            </th>
            <th style={{ textAlign: "center" }}>£{order.cart.totalPrice}</th>
          </tr>
        </table>
      </Card>
      <div style={{ margin: "1rem 0" }}>
        <table style={{ width: "100%" }}>
          <tr>
            <td align="left">
              <SideTitle>Payment:</SideTitle>
            </td>
            <td align="right">
              <table>
                <tr>
                  <td align="right">
                    {order.payment === "cash" ? (
                      <WalletIcon />
                    ) : (
                      <CreditCardIcon />
                    )}
                  </td>
                  <td align="right">{order.payment}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      {order.extraInformation.length ? (
        <>
          <SideTitle>Extra Information:</SideTitle>
          <br />
          <Card>{order.extraInformation}</Card>
        </>
      ) : (
        ""
      )}
    </EmailLayout>
  );
}
