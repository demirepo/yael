import React from "react";
import style from "./ContextModal.module.css";

export default function ContextModal() {
  return (
    <div id={style.wordContext}>
      <div className={style.examples}>{"examples"}</div>
      <div className={style.word}>{"getLettersOnly(spanText)"}</div>
    </div>
  );
}
