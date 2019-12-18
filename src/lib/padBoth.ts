export default function padBoth(s: string, width: number): string {
  const diff: number = width - s.length;
  if (diff <= 0) return s;

  s = ' '.repeat(Math.floor(diff / 2)) + s;
  s = s + ' '.repeat(Math.ceil(diff / 2));

  return s;
}
