import Search from "@/components/search/Search";
import { renderToStaticMarkup } from "react-dom/server";
import { singleton } from "tsyringe";

@singleton()
export class MailService {
  constructor() {}

  async orderNotification(order: Order) {
    return fetch("/api/email/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }).then((res) => res.json());
  }

  async contactUsNotification(contactUs: ContactUs) {
    // Api call to send email.
  }
}
