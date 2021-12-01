import React from "react";
import style from "./Reader.module.css";
import Martin from "./Martin";
import ContextModal from "../ContextModal/ContextModal";
import { useSelector } from "react-redux";

export default function Reader() {
  const showModal = useSelector((state) => state.modal.showModal);
  return (
    <main className={style.reader}>
      {showModal && <ContextModal />}
      <Martin />
    </main>
  );
}
