import ContactUs from "@/components/ContactUs";
import CallIcon from "@/icons/Call";
import EnvelopeIcon from "@/icons/Envelope";

export default function ContactUsPage() {
  return (
    <div
      className="bg-light p-4 rounded"
      style={{ maxWidth: "750px", marginInline: "auto", marginBlock: "2rem" }}
    >
      <h1 className="text-secondary mb-4">Contact</h1>
      <ContactUs />
      <p className="text-center">
        <CallIcon />
        <span>
          <a className="btn p-0 fw-semibold" href="tel:07311099930">
            Tel: 07311099930
          </a>
        </span>
        <div className="m-2 hstack gap-2 justify-content-center align-items-center">
          <EnvelopeIcon className="" />
          <a
            className=" fw-semibold btn p-0"
            href="mailto:zayd@middleeasternfood.co.uk"
          >
            zayd@midddleeasternfood.co.uk
          </a>
        </div>
      </p>
    </div>
  );
}
