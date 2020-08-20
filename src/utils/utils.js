export function transformToLabel(text) {
  return text
    .split('_')
    .map((word) => word.replace(/\b\w/g, (l) => l.toUpperCase()))
    .join(' ');
}
