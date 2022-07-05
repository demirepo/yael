export function getHighlightedFragment(text) {
  const queryRegx = new RegExp(`<(.+?)>`, 'gi');
  return text.replace(
    queryRegx,
    '<span style="background-color: rgba(25, 131, 255, 0.05); color: rgb(25, 131, 255)"> $1 </span>'
  );
}
