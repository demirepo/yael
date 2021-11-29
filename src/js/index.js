"use strict";
import {
  SELECTED_SPAN_CLASS,
  WORD_CLASS,
  getContextForWord,
  getSpanInfoFromClick,
  spanify,
} from "./functions.js";

//выделение
document.addEventListener("click", (e) => {
  e.preventDefault;
  const wordSpan = e.target.closest(`.${WORD_CLASS}`);
  if (!wordSpan) return;
  let selectedWord = document.querySelector(`.${SELECTED_SPAN_CLASS}`);
  if (selectedWord && selectedWord !== wordSpan)
    selectedWord.classList.toggle(`${SELECTED_SPAN_CLASS}`);
  wordSpan.classList.toggle(SELECTED_SPAN_CLASS);
});
// поиск вхождений выделенного слова в тексте вместе с контекстами
document.addEventListener("click", (e) => getContextForWord(e));
//========================================================================

spanify(".reader");

document.addEventListener("click", (e) => getSpanInfoFromClick(e));
