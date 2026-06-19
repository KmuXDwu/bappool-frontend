import { CircleX } from "lucide-react";

function FilterPill({ label, muted = false }) {
  return (
    <span className={muted ? "filter-pill muted" : "filter-pill"}>
      {label}
      <CircleX size={12} aria-hidden="true" />
    </span>
  );
}

export default FilterPill;
