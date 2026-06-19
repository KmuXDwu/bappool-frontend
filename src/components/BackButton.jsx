import { ArrowLeft } from "lucide-react";

function BackButton({ onClick, className = "" }) {
  return (
    <button
      className={`back-button ${className}`}
      type="button"
      aria-label="뒤로가기"
      onClick={onClick}
    >
      <ArrowLeft size={34} />
    </button>
  );
}

export default BackButton;
