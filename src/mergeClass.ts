export function mergeClass(
  a: string | undefined,
  b: string | undefined
): string | undefined {
  if (a == null && b == null) {
    return a;
  }
  if (a == null) {
    return b;
  }
  if (b == null) {
    return a;
  }
  return `${a} ${b}`;
}
