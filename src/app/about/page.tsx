function SideTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-primary-emphasis">{children}</h3>;
}
export default function AboutUs() {
  return (
    <div className="text-light container">
      <h1 className="text-center m-3">About Us</h1>

      <SideTitle>Welcome</SideTitle>
      <p>
        Welcome to our vegetarian shop that serves the most delicious, fresh and
        healthy vegetarian food. We care about providing diverse and delicious
        vegan options for all tastes, and we believe that a vegan diet can be
        full of flavor and variety.
      </p>
      <SideTitle>Features</SideTitle>
      <p>
        Our restaurant features organic and fresh ingredients that come from
        trusted sources, and we offer healthy, delicious meals at reasonable
        prices. Our menu is varied and full of delicious vegetarian options,
        including main dishes, salads, soups
      </p>
      <SideTitle>Vesion</SideTitle>
      <p>
        We believe that a vegan diet is the best option for your health and the
        health of the environment, and we take pride in providing a high quality
        service to all of our visitors. We strive to meet your dietary needs and
        provide delicious and nutritious options.
      </p>
      <p className="fst-italic">
        If you are looking for a fun and delicious vegan food experience,
        welcome to our vegan shop!
      </p>
    </div>
  );
}
