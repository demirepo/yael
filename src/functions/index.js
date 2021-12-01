"use strict";
import { closeModal, clickHandler, spanify } from "./click.js";
import { getSpanInfoFromClick } from "./click.js";

document.addEventListener("click", (e) => {
  clickHandler(e);
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

spanify(".reader");
