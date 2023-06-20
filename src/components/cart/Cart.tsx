"use client";

import Image from "next/image";
import shawarmaImage from "../../../public/shawarma.jpg";

function LineRecord({ cartItem }: any) {
  return (
    <div className="row">
      <div className="col"></div>
    </div>
  );
}

export default function Cart() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Image src={shawarmaImage} alt="Meal Iamge" />
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
