import EmailLayout, { Card, SideTitle, Title } from "../EmailLayout";

export default function ContactTemplate({
  contactUs,
}: {
  contactUs: ContactUs;
}) {
  const contactKeys: (keyof ContactUs)[] = ["name", "email", "phone"];

  return (
    <EmailLayout>
      <Title>Contact Request</Title>
      <SideTitle>Contact Details</SideTitle>
      <Card>
        <table style={{ width: "100%" }}>
          {contactKeys.map((k) => (
            <tr key={k}>
              <td align="left">{k[0].toUpperCase() + k.slice(1)}</td>
              <td align="right">{contactUs[k]}</td>
            </tr>
          ))}
        </table>
      </Card>

      <SideTitle>Message:</SideTitle>
      <Card>
        <p>{contactUs.message}</p>
      </Card>
    </EmailLayout>
  );
}
