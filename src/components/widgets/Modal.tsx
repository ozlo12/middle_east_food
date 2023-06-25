"use client";

import useClickout from "@/hooks/use-clickout";
import { ReactNode, useRef } from "react";

interface ModalProps {
  children: ReactNode;
  title: string;
  show: boolean;
  action: JSX.Element;
  closeHandler: () => void;
}
export default function Modal(props: ModalProps) {
  const { children, title, show, action, closeHandler } = props;

  const modalRef = useRef(null);

  useClickout(modalRef, closeHandler);

  return (
    <div
      style={{ display: show ? "block" : "none" }}
      className="modal fade show bg-dark bg-opacity-75"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">{title}</h1>
            <button
              onClick={closeHandler}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              onClick={closeHandler}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            {action}
          </div>
        </div>
      </div>
    </div>
  );
}
