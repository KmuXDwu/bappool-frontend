import { HeartHandshake } from "lucide-react";

function CompletePage({ onHome }) {
  return (
    <div className="mobile-page complete-page">
      <HeartHandshake size={54} />

      <h1>완료되었어요</h1>

      <p>밥약 후 과정이 정상적으로 저장되었습니다.</p>

      <button className="large-orange-button" type="button" onClick={onHome}>
        밥약 잡기로 돌아가기
      </button>
    </div>
  );
}

export default CompletePage;
