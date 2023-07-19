import Search from "@/components/search/Search";
import { renderToStaticMarkup } from "react-dom/server";
import { singleton } from "tsyringe";

@singleton()
export class MailService {
  constructor() {}

  async orderNotification(order: Order) {
    const contentKeys: (keyof Order["contact"])[] = [
      "name",
      "email",
      "phone",
      "address",
      "postcode",
      "city",
    ];
    const { contact, cart } = order;
    const subject = "Order";

    console.log(order);
    const html = `
    <div class="container">
    <h1 class="title">New Order</h1>

    <h3 class="side-title">Customer information:</h3>
    <div class="card">
      <table>
        <tbody>

        ${contentKeys
          .map(
            (k) => `
          <tr>
           <th class="text-left">${k.toUpperCase()}</th>
           <td class="text-right" >${contact[k]}</td>
         </tr>`
          )
          .join("")}

        </tbody>
      </table>
    </div>

    <h3 class="side-title">Cart:</h3>
    <div class="card">
      <table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-center">Count</th>
            <th class="text-right">Price</th>
          </tr>
        </thead>
        <tbody>

          ${cart.items
            .map(
              ({ item, quantity }) => `
          <tr>
            <td class="text-left">
              <img class="float-left" width="40px" src="${item.image}" alt="${item.name}"/>
              <span class="ms">${item.name}</span>
            </td>
            <td class="text-center">${quantity}</td>
            <td class="text-right">£${item.price}</td>
          </tr> 
          `
            )
            .join("")}


         <tr>
              <th span="2" class="text-center">Total</th>
              <td>£${cart.totalPrice}</td>
         </tr>
        </tbody>
      </table>
    </div>

    <table>
      <tr>
        <td>
          <h3 class="side-title">Payment:</h3>
        </td>
        <td>
          <div class="text-right">
            <span style="pill">${order.payment}</span>
          </div>
        </td>
      </tr>
    </table>

    ${
      order.extraInformation.length
        ? `<h3 class="side-title">Extra Information:</h3> <p>${order.extraInformation}</p>`
        : ""
    }
  </div>
    `;
    const markup = renderToStaticMarkup(Search({ products: [] }));
    fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({ subject, html }),
      headers: { "Content-Type": "application/json" },
    });
  }

  async contactUsNotification(contactUs: ContactUs) {
    // Api call to send email.
  }
}
