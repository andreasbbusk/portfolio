export function getRenderedLines(node: HTMLElement, text: string): string[] {
  const textNode = node.firstChild;

  if (!(textNode instanceof Text)) {
    return [text];
  }

  const range = document.createRange();
  const lines: string[] = [];
  const tolerance = 2;
  let currentLine = "";
  let currentTop: number | null = null;

  for (let index = 0; index < text.length; index += 1) {
    range.setStart(textNode, index);
    range.setEnd(textNode, index + 1);

    const rects = range.getClientRects();
    const rect = rects[0] ?? rects[rects.length - 1];
    const character = text[index] ?? "";

    if (!rect) {
      currentLine += character;
      continue;
    }

    if (currentTop === null) {
      currentTop = rect.top;
    }

    if (Math.abs(rect.top - currentTop) > tolerance && currentLine.trim()) {
      lines.push(currentLine.trimEnd());
      currentLine = character;
      currentTop = rect.top;
      continue;
    }

    currentLine += character;
  }

  if (currentLine.trim()) {
    lines.push(currentLine.trimEnd());
  }

  return lines.length > 0 ? lines : [text];
}
