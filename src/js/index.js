"use strict";
const WORD_CLASS = "word";
const SELECTED_SPAN_CLASS = "selected-word";

spanify(".reader");

document.addEventListener("click", (e) => {
  e.preventDefault;
  const word = e.target.closest(`.${WORD_CLASS}`);
  if (word) {
    let selectedWord = document.querySelector(`.${SELECTED_SPAN_CLASS}`);
    if (selectedWord && selectedWord !== word)
      selectedWord.classList.toggle(`${SELECTED_SPAN_CLASS}`);
    word.classList.toggle(SELECTED_SPAN_CLASS);
    console.log(getSentanceAroundWord(word));
  }
});
//========================================================================
function spanify(container) {
  let paragraphs = document.querySelector(container).children;
  [...paragraphs].forEach((element) => {
    element.innerHTML = element.innerHTML
      .replace(/\n/g, " ")
      .split(/[ ]/)
      .map((el) => (el === "" ? el : `<span class=${WORD_CLASS}>${el}</span>`))
      .join(" ");
  });
}

function getSentanceAroundWord(word) {
  const siblings = [...word.parentNode.children];

  function getWordIndex(siblings) {
    let index;
    siblings.forEach((el, i) => {
      el.classList.contains(SELECTED_SPAN_CLASS) && (index = i);
    });
    return index;
  }

  const wordIndex = getWordIndex(siblings);
  const lastWordRegexp = /^.+[\.\!\?\…]+/;
  let lastWordIndex;
  let firstWordIndex;
  // ищем последнее слово предложения
  for (let i = wordIndex; i < siblings.length; i++) {
    const text = siblings[i].textContent;
    if (lastWordRegexp.test(text)) {
      lastWordIndex = i;
      break;
    }
  }
  // ищем первое слово предложения
  for (let i = wordIndex; i >= 0; i--) {
    const word = siblings[i].textContent;
    const isCapitalFirst =
      /^[a-zA-zа-яА-Я]+/.test(word) && word[0] === word[0].toUpperCase();
    const prevWordIsLastWord =
      i !== 0 && lastWordRegexp.test(siblings[i - 1].textContent);
    if (wordIndex === 0 || (isCapitalFirst && prevWordIsLastWord)) {
      firstWordIndex = i;
      break;
    }
  }

  return siblings
    .slice(firstWordIndex, lastWordIndex + 1)
    .map((el) => el.textContent)
    .join(" ");
}
