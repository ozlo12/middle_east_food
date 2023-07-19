import ContactUs from "@/components/ContactUs";
import CallIcon from "@/icons/Call";

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
          <a className="btn p-0" href="tel:07311099930">
            Tel: 07311099930
          </a>
        </span>
      </p>
    </div>
  );
}
