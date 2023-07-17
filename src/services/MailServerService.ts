import { singleton } from "tsyringe";
import { createTransport, Transporter } from "nodemailer";

@singleton()
export class MailServerService {
  private transporter: Transporter;
  constructor() {
    this.transporter = this.transporterInit();
  }
  private transporterInit(): Transporter {
    return createTransport({
      host: process.env.MAIL_HOST || "",
      port: +(process.env.MAIL_PORT || 443),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: true,
    });
  }

  async sendMail(subject: string, html: string) {
    this.transporter.sendMail({
      to: process.env.MAIL_ADMIN,
      subject,
      from: process.env.MAIL_FROM,
      html,
    });
  }
}
