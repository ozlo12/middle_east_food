// import { Contact } from "@/models/User";

import { mailServerService } from "@/container/ServerContainer";
import { NextResponse } from "next/server";

const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    .container {
      background: rgb(241, 236, 221);
      border-radius: 5px;
      padding: 0.5rem;
    }

    .card {
      overflow: auto;
      background: #fff;
      padding: 0.5rem;
      margin: 0.5rem;
      border-radius: 5px;
    }

    table {
      width: 100%;
    }

    th,
    td {
      padding: 0.5rem;
    }

    td {
    }

    .flex {
      display: flex;
    }

    .float-right {
      float: right;
    }

    .float-left {
      float: left;
    }

    .center {
      text-align: center;
    }

    .text-left {
      text-align: left;
    }

    .text-right {
      text-align: end;
    }

    .text-center {
      text-align: center;
    }

    .me {
      margin: 0 0.5rem 0 0;
    }

    .ms{
      margin : 0 0 0 .5rem;
    }
    .title {
      margin-bottom: 1rem;
      color: rgb(228, 165, 50);
      text-align: center;
    }

    .side-title {
      color: rgb(126, 119, 106);
      margin-bottom: 1rem;
      margin-top: 1rem;
    }
    .pill {
      padding: 0.5rem;
      border-radius: 3rem;
      color: #fff;
      font-size: 1rem;
      background-color: rgb(228, 165, 50);
    }
  </style>

  </head>
  <body>
    {content}
  </body>
</html>
`;
export async function POST(req: Request) {
  const { subject, html } = await req.json();
  try {
    const withTemplate = template.replace("{content}", html);

    await mailServerService.sendMail(subject, withTemplate);
    return NextResponse.json({
      status: "success",
      message: "Email sent successfully",
    });
  } catch (err) {
    console.log(err instanceof Error ? err.message : err);
    return NextResponse.json({
      status: "fail",
      message: "Something went wrong while sending email!",
    });
  }
}
