import { CATEGORIES } from "@/data/constants";
import { cn } from "@/utils/cn";

/**
 * Renders text with potentially harmful spans highlighted.
 * `highlights` = [{ start, end, categories: [] }] (non-overlapping, any order).
 */
export default function HighlightedText({ text, highlights = [], className }) {
  const sorted = [...highlights].sort((a, b) => a.start - b.start);
  const nodes = [];
  let cursor = 0;

  sorted.forEach((h, i) => {
    if (h.start > cursor) nodes.push(text.slice(cursor, h.start));
    const labels = h.categories?.map((c) => CATEGORIES[c]?.label ?? c).join(", ");
    nodes.push(
      <mark
        key={`${h.start}-${i}`}
        title={labels}
        className="rounded-md bg-danger/15 px-1 py-0.5 font-semibold text-danger underline decoration-danger/60 decoration-wavy underline-offset-4"
      >
        {text.slice(h.start, h.end)}
      </mark>,
    );
    cursor = h.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));

  return <p className={cn("whitespace-pre-wrap break-words text-sm leading-7 text-fg", className)}>{nodes}</p>;
}
