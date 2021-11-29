export const WORD_CLASS = "word";
export const SELECTED_SPAN_CLASS = "selected-word";
export const CONTEXT_MODAL_CLASS = "word-context";
export const OPENING_QUOTES = ['"', "«", "“"];
export const CLOSING_QUOTES = ['"', "»", "”"];
let spanHash = null;

export function getLettersOnly(str) {
  return str.replace(/[,.:;…"»”«“]/g, "");
}

export function spanify(container) {
  let paragraphs = document.querySelector(container).children;
  [...paragraphs].forEach((element) => {
    element.innerHTML = element.innerHTML
      .replace(/\n/g, " ")
      .split(/[ ]/)
      .map((el) => (el === "" ? el : `<span class=${WORD_CLASS}>${el}</span>`))
      .join(" ");
  });
}

export function getSentanceAroundWord(node) {
  const siblings = [...node.parentNode.children];
  const wordIndex = getWordIndexInParagraph(node);
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

  function getWordIndexInParagraph(word) {
    let index;
    [...word.parentNode.children].forEach((el, i) => {
      el.textContent === word.textContent && (index = i);
    });
    return index;
  }
}

export function getContextForWord(e) {
  const isModalExists = document.querySelector(`.${CONTEXT_MODAL_CLASS}`);
  const spans = document.querySelectorAll(`.${WORD_CLASS}`);
  const wordSpan = e.target.closest(`.${WORD_CLASS}`);
  if (wordSpan) {
    const contextArr = [];
    for (const span of spans) {
      if (
        getLettersOnly(span.textContent).toLowerCase() ==
        getLettersOnly(wordSpan.textContent).toLowerCase()
      )
        contextArr.push({ span, text: getSentanceAroundWord(span) });
    }
    displayWordContextModal(
      wordSpan,
      contextArr,
      isModalExists,
      CONTEXT_MODAL_CLASS
    );
  }
}

export function displayWordContextModal(
  wordSpan,
  arr,
  isModalExists,
  CONTEXT_MODAL_CLASS
) {
  if (isModalExists) return;

  const modal = document.createElement("div");
  let contextArr = arr.map((el, i) => {
    let word = wordSpan.textContent;
    const taggedText = el.text.replace(word, `<strong>${word}</strong>`);
    spanHash = { ...spanHash, [i]: el.span };
    return `<p data-span-id="${i}">${taggedText}</p>`;
  });
  contextArr = [...new Set(contextArr)].join("<hr>");

  console.log(spanHash);

  modal.classList.add(CONTEXT_MODAL_CLASS);
  modal.innerHTML = `
          <div class="${CONTEXT_MODAL_CLASS}__examples">${contextArr}</div>
          <div class="${CONTEXT_MODAL_CLASS}__word">${getLettersOnly(
    wordSpan.textContent
  )}</div>
          <button class="${CONTEXT_MODAL_CLASS}__close-btn">закрыть</button>
    `;
  document.body.appendChild(modal);

  document.addEventListener("click", (e) => {
    if (e.target.closest(`.${CONTEXT_MODAL_CLASS}__close-btn`)) {
      modal.remove();
      spanHash = null;
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-span-id]")) return;
    let el = spanHash[e.target.dataset.spanId];
    el.scrollIntoView();
  });
}

export function getSpanInfoFromClick(e) {
  const wordSpan = e.target.closest(`.${WORD_CLASS}`);
  if (!wordSpan) return;

  const paragraphs = document.querySelectorAll("p"); //оптимизировать,чтобы не искал каждый раз?
  let paragraph = wordSpan.parentNode;
  let paragraphId = null;
  let wordId = 0;

  for (let i = 0; i < paragraphs.length; i++) {
    const el = paragraphs[i];
    if (paragraph === el) paragraphId = i;
  }

  for (let span of paragraph.children) {
    if (span === wordSpan) break;
    wordId++;
  }
  return { span: wordSpan, paragraphId, wordId };
}
