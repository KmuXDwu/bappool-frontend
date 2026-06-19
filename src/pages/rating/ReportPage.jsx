import { useState } from "react";

import BackButton from "../../components/BackButton";
import FakeKeyboard from "../../components/FakeKeyboard";

function ReportPage({ onBack, onSubmit }) {
  const [reason, setReason] = useState("");

  return (
    <div className="mobile-page report-page">
      <BackButton onClick={onBack} className="report-back-button" />

      <h1>밥약이 아쉬우셨다면</h1>

      <label className="report-box">
        <span>
          이유를 적어주세요.
          <br />
          답변은 익명으로 전송됩니다.
        </span>

        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        />
      </label>

      <button
        className="report-submit"
        type="button"
        disabled={!reason.trim()}
        onClick={() => onSubmit(reason)}
      >
        제출
      </button>

      <FakeKeyboard />
    </div>
  );
}

export default ReportPage;
