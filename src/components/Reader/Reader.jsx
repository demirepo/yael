import React from "react";
// import Martin from "./components/Reader/Martin";
import style from "./Reader.module.css";
import Martin from "./Martin";

export default function Reader() {
  return (
    <main className={style.reader}>
      <Martin />
    </main>
  );
}
