export default function ellipsis(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const sliceLength = (maxLength - 3) / 2; // Subtract 3 for "..."
  const start = text.substring(0, sliceLength);
  const end = text.substring(text.length - sliceLength);

  return `${start}...${end}`;
}
