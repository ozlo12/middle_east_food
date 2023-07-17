import { singleton } from "tsyringe";

@singleton()
export class MailService {
  constructor() {}

  async orderNotification(order: Order) {
    const { contact, cart } = order;
    const subject = "Order";
    // const html = `
    // <h1>Order Recived</h1>
    //   <h3>Customer Name: ${contact.name}</h3>
    //   <h3>Customer Phone: ${contact.phone}</h3>
    //   <h3>Customer City: ${contact.city}</h3>
    //   <h3>Customer Address: ${contact.address}</h3>
    //   <h3>Customer Postcode: ${contact.postcode}</h3>
    //   <h3>Mail Name: ${cart.} </h3>
    // `;
    const html = `
    <h1 style="color:orange;">Order</h1> 
    `;
    fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({ subject, html }),
      headers: { "Content-Type": "application/json" },
    });
    // Api call to send email.
  }

  async contactUsNotification(contactUs: ContactUs) {
    // Api call to send email.
  }
}
