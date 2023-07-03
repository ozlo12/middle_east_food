"use client";

import useClickout from "@/hooks/use-clickout";
import EnvelopeIcon from "@/icons/Envelope";
import { useRef } from "react";

export default function EmailDropdown() {
  const ref = useRef(null);
  const { show, setShow } = useClickout(ref);
  return (
    <div style={{ width: "30px" }} className="dropdown mx-auto" ref={ref}>
      <button
        onClick={() => setShow((cur) => !cur)}
        className="btn btn-secondary dropdown-toggle bg-transparent border-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <EnvelopeIcon />
      </button>
      <ul className={`dropdown-menu ${(show && "show") || ""}`}>
        <li>
          <a
            className="dropdown-item"
            href="mailto:zayd@midddleeasternfood.co.uk
          "
          >
            zayd@midddleeasternfood.co.uk
          </a>
        </li>
      </ul>
    </div>
  );
}
