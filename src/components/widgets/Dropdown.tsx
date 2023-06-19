"use client";

import {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const dropdownButtonGenerator =
  (Button: FC<{ onClick: MouseEventHandler }>) =>
  ({ children }: { children: ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const clickoutHandler = useCallback((ev: MouseEvent) => {
      if (ref.current && ref.current.contains(ev.target as HTMLElement)) return;
      setShow(false);
    }, []);

    useEffect(() => {
      document.addEventListener("click", clickoutHandler, true);
      return document.removeEventListener("click", clickoutHandler);
    }, []);
    return (
      <div dir="rtl" ref={ref} className="dropdown ">
        <Button
          onClick={() => {
            setShow((cur) => !cur);
          }}
        />
        <ul
          onClick={() => setShow(false)}
          className={`dropdown-menu  ${show && "show"}`}
        >
          {children}
        </ul>
      </div>
    );
  };
