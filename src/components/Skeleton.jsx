import { cn } from "@/utils/cn";

/** Shimmering placeholder block used while data is loading. */
export default function Skeleton({ className }) {
  return <div aria-hidden className={cn("skeleton rounded-lg", className)} />;
}
