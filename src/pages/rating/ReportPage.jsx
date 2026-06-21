import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import BackButton from "../../components/BackButton";
import FakeKeyboard from "../../components/FakeKeyboard";

function ReportPage() {
  const navigate = useNavigate(); 
  const [reason, setReason] = useState("");

  // 제출 버튼 클릭 시 작동할 함수
  const handleSubmit = () => {
    if (!reason.trim()) return;

    // 원래 기획되어 있던 제출 로직 처리 (예: API 전송 등)
    console.log("신고 사유 제출:", reason);

    alert("소중한 의견이 익명으로 전송되었습니다.");
    
    // 💡 제출 완료 후 마이페이지로 이동하도록 변경!
    // 프로젝트의 Router.jsx에 등록된 마이페이지 주소에 맞게 적어주세요. (예: /mypage 또는 /profile 등)
    navigate("/mypage"); 
  };

  return (
    <div className="mobile-page report-page">
      <BackButton onClick={() => navigate(-1)} className="report-back-button" />

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
        onClick={handleSubmit}
      >
        제출
      </button>

      <FakeKeyboard />
    </div>
  );
}

export default ReportPage;