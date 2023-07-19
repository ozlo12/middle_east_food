interface Children {
  children: React.ReactNode;
}

export function Title({ children }: Children) {
  return <h1 style={{ color: "#e4a532", textAlign: "center" }}>{children}</h1>;
}

export function SideTitle({ children }: Children) {
  return (
    <h3
      style={{
        color: "#7e776a",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      {children}
    </h3>
  );
}

export function Card({ children }: Children) {
  return (
    <div
      style={{
        padding: ".5rem",
        borderRadius: "5px",
        backgroundColor: "#fff",
      }}
    >
      {children}
    </div>
  );
}

export default function EmailLayout({ children }: Children) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        {/* <meta httpEquiv="X-UA-Compatible" content="IE=edge" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "#f1ecdd",
            padding: ".5rem",
            height: "100vh",
            overflow: "auto",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
