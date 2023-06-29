"use client";

import { createContext, useContext, useState } from "react";

const ToastContext = createContext<{
  message: JSX.Element;
  setContext: (message: JSX.Element) => void;
}>({
  setContext: (message: JSX.Element) => {},
  message: <div></div>,
});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState(<div></div>);
  const [show, setShow] = useState(false);

  const setContext = (message: JSX.Element) => {
    setMessage(message);
    setShow(true);
    setTimeout(() => setShow(false), 4000);
  };

  return (
    <ToastContext.Provider value={{ setContext, message }}>
      <>
        <span
          className={`${
            (!show && "d-none") || ""
          } top-0 start-50 translate-middle-x position-absolute p-4 z-3`}
        >
          {message}
        </span>
        {children}
      </>
    </ToastContext.Provider>
  );
}
