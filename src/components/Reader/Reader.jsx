import React from "react";
import style from "./Reader.module.css";
import Martin from "./Martin";
import ContextModal from "../ContextModal/ContextModal";
import { useSelector } from "react-redux";
import Settings from "../Settings/Settings";

export default function Reader() {
  const showContextModal = useSelector((state) => state.modal.showContextModal);
  const showSettingsModal = useSelector(
    (state) => state.modal.showSettingsModal
  );
  return (
    <main className={style.reader}>
      {showContextModal && <ContextModal />}
      {showSettingsModal && <Settings />}
      <Martin />
    </main>
  );
}
