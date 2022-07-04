export const WORD_CLASS = "word";
export const SELECTED_SPAN_ID = "selected-word";
export const CONTEXT_MODAL_CLASS = "word-context";
export const OPENING_QUOTES = ['"', "«", "“"];
export const CLOSING_QUOTES = ['"', "»", "”"];

export function clickHandler(e) {
  const modal = document.getElementById(CONTEXT_MODAL_CLASS);
  const { span } = getSpanInfoFromClick(e) || {};
  const isModalClicked = e.target.closest(`#${CONTEXT_MODAL_CLASS}`);

  if (modal && !isModalClicked) closeModal();
  if (!span || (modal && isModalClicked)) return;

  if (!modal) {
    selectSpan(span);
    getWordContext(span);
  }
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
  const wordIndex = getChildIndexInParent(node);
  const lastWordRegexp = /^.+[.!?…]+["»”]?$/;
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
}

export function getWordContext(span) {
  const allSpans = document.querySelectorAll(`.${WORD_CLASS}`);
  if (span) {
    const contextArr = [];
    let index = 0;
    for (const el of allSpans) {
      if (
        getLettersOnly(el.textContent).toLowerCase() ===
        getLettersOnly(span.textContent).toLowerCase()
      ) {
        contextArr.push({ index, span: el, text: getSentanceAroundWord(el) });
        index++;
      }
    }
    displayWordContextModal(span, contextArr);
  }
}

export function displayWordContextModal(span, contextArr) {
  const modal = document.createElement("div");
  let spanText = span.textContent;
  const spanTextRx = new RegExp(`\\b(${getLettersOnly(spanText)})\\b`, "i");
  let examples = contextArr.map((el) => {
    const taggedText = el.text.replace(
      spanTextRx,
      "<strong>$1</strong>" // слово began не выделяется, как и разные регистры
    );
    return `<p data-span-id="${el.index}">${taggedText}</p>`;
  });
  examples = [...new Set(examples)].join("<hr>");

  modal.id = CONTEXT_MODAL_CLASS;
  modal.innerHTML = `
          <div class="${CONTEXT_MODAL_CLASS}__examples">${examples}</div>
          <div class="${CONTEXT_MODAL_CLASS}__word">
            ${getLettersOnly(spanText)}
          </div>
    `;
  document.body.appendChild(modal);

  document.addEventListener("click", (e) => {
    const paragraph = e.target.closest("[data-span-id]");
    if (!paragraph) return;

    let spanObj = contextArr.find((el) => {
      return el["index"] === +paragraph.dataset.spanId;
    });
    if (spanObj) {
      spanObj.span.scrollIntoView();
      closeModal();
      selectSpan(spanObj.span);
    }
    window.scrollBy(0, -e.clientY);
  });
}
export function getLettersOnly(str) {
  return str.replace(/[,.:;…"»”«“]/g, "");
}

export function selectSpan(span) {
  const selectedSpan = document.getElementById(SELECTED_SPAN_ID);
  if (selectedSpan && selectedSpan !== span) unselectSpan(selectedSpan);
  span.id = SELECTED_SPAN_ID;
}

export function unselectSpan(span) {
  span.removeAttribute("id");
}

export function getChildIndexInParent(child) {
  let index = 0;
  let parent = child.parentNode;
  for (let el of parent.children) {
    if (el === child) return index;
    index++;
  }
}

export function getSpanInfoFromClick(e) {
  const span = e.target.closest(`.${WORD_CLASS}`);
  if (!span) return;

  const paragraph = span.parentNode;
  const paragraphIdx = getChildIndexInParent(paragraph);
  const offset = getChildIndexInParent(span);

  return { span, paragraphIdx, offset };
}

export function closeModal() {
  const modal = document.getElementById(CONTEXT_MODAL_CLASS);
  const span = document.getElementById(SELECTED_SPAN_ID);
  modal && modal.remove();
  span && unselectSpan(span);
}
