"use strict";
const WORD_CLASS = "word";
const SELECTED_SPAN_CLASS = "selected-word";
const CONTEXT_MODAL_CLASS = "word-context";
const OPENING_QUOTES = ['"', "«", "“"];
const CLOSING_QUOTES = ['"', "»", "”"];

spanify(".reader");
//выделение
document.addEventListener("click", (e) => {
  e.preventDefault;
  const wordSpan = e.target.closest(`.${WORD_CLASS}`);
  if (wordSpan) {
    let selectedWord = document.querySelector(`.${SELECTED_SPAN_CLASS}`);
    if (selectedWord && selectedWord !== wordSpan)
      selectedWord.classList.toggle(`${SELECTED_SPAN_CLASS}`);
    wordSpan.classList.toggle("SELECTED_SPAN_CLASS");
    console.log(getSentanceAroundWord(wordSpan));
  }
});
// поиск вхождений выделенного слова в тексте вместе с контекстами
document.addEventListener("click", (e) => {
  getContextForWord(e);
});
//========================================================================
function getLettersOnly(str) {
  return str.replace(/[,.:;…"»”«“]/g, "");
}

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

function getSentanceAroundWord(node) {
  const siblings = [...node.parentNode.children];
  const wordIndex = getWordIndex(node);
  const lastWordRegexp = /^.+[\.\!\?\…]+["»”]?$/;
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
    let text = siblings[i].textContent;
    //проверяем, что начинается с заглавной, учитывая возможные кавычки первым символом
    const isCapital = (() => {
      if (OPENING_QUOTES.includes(text[0])) text = text.slice(1);
      return /^[a-zA-zа-яА-Я]+/.test(text) && text[0] === text[0].toUpperCase();
    })(text);

    const prevWordIsLastWord = (() => {
      if (i === 0) return true;
      text = siblings[i - 1].textContent;
      return lastWordRegexp.test(siblings[i - 1].textContent);
    })(text, i);

    if (wordIndex === 0 || (isCapital && prevWordIsLastWord)) {
      firstWordIndex = i;
      break;
    }
  }

  return siblings
    .slice(firstWordIndex, lastWordIndex + 1)
    .map((el) => el.textContent)
    .join(" ");

  function getWordIndex(word) {
    let index;
    [...word.parentNode.children].forEach((el, i) => {
      el.textContent === word.textContent && (index = i);
    });
    return index;
  }
}

function getContextForWord(e) {
  const isModalExists = document.querySelector(`.${CONTEXT_MODAL_CLASS}`);
  const spans = document.querySelectorAll(`.${WORD_CLASS}`);
  const word = e.target.closest(`.${WORD_CLASS}`);
  if (word) {
    const contextArr = [];
    for (const span of spans) {
      if (
        getLettersOnly(span.textContent).toLowerCase() ==
        getLettersOnly(word.textContent).toLowerCase()
      )
        contextArr.push(getSentanceAroundWord(span));
    }
    displayWordContextModal(
      word,
      contextArr,
      isModalExists,
      CONTEXT_MODAL_CLASS
    );
  }
}

function displayWordContextModal(
  word,
  arr,
  isModalExists,
  CONTEXT_MODAL_CLASS
) {
  if (isModalExists) return;
  const modal = document.createElement("div");
  let contextArr = arr.map((el) => `<p>${el}</p>`);
  contextArr = [...new Set(contextArr)].join("<hr>");

  modal.classList.add(CONTEXT_MODAL_CLASS);
  modal.innerHTML = `
        <div class="${CONTEXT_MODAL_CLASS}__examples">${contextArr}</div>
        <div class="${CONTEXT_MODAL_CLASS}__word">${getLettersOnly(
    word.textContent
  )}</div>
        <button class="${CONTEXT_MODAL_CLASS}__close-btn">закрыть</button>
  `;
  document.body.appendChild(modal);
  document.addEventListener("click", (e) => {
    if (e.target.closest(`.${CONTEXT_MODAL_CLASS}__close-btn`)) {
      modal.remove();
    }
  });
}
