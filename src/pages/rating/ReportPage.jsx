import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import FakeKeyboard from "../../components/FakeKeyboard";

function ReportPage() {
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [reason, setReason] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const handleOpenKeyboard = () => {
    setIsKeyboardOpen(true);
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!reason.trim()) return;

    alert("소중한 의견이 익명으로 전송되었습니다.");
    navigate("/mypage");
  };

  return (
    <div className="mobile-page report-page">
      <BackButton onClick={() => navigate(-1)} className="report-back-button" />

      <h1>밥약이 아쉬우셨다면</h1>

      <label
        className={`report-box ${reason.trim() ? "has-text" : ""}`}
        onClick={handleOpenKeyboard}
      >
        {!reason.trim() && (
          <span>
            이유를 적어주세요.
            <br />
            답변은 익명으로 전송됩니다.
          </span>
        )}

        <textarea
          ref={textareaRef}
          value={reason}
          onFocus={() => setIsKeyboardOpen(true)}
          onChange={(event) => setReason(event.target.value)}
        />
      </label>

      <button
        className="report-submit"
        type="button"
        disabled={!reason.trim()}
        onClick={handleSubmit}
      >
        제출
      </button>

      {isKeyboardOpen && <FakeKeyboard />}
    </div>
  );
}

export default ReportPage;
