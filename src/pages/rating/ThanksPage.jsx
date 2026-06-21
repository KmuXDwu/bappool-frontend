import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import CharacterImage from "../../components/CharacterImage";

// 💡 밥약 만족 캐릭터 이미지를 상대 경로로 직접 가져옵니다.
import satisfiedImage from "../../assets/images/profile2_satisfied.svg";

function ThanksPage() {
  const navigate = useNavigate();

  // '보은 하기' 버튼 클릭 시 마이페이지로 이동
  const handleConfirm = () => {
    // 💡 프로젝트의 Router.jsx에 등록된 마이페이지 주소에 맞게 적어주세요. (/mypage 혹은 /profile 등)
    navigate("/mypage"); 
  };

  return (
    <div className="mobile-page thanks-page">
      {/* 뒤로가기 클릭 시 안전하게 이전 평가 페이지로 복귀 */}
      <BackButton onClick={() => navigate(-1)} />

      <h1>밥약에 만족하셨다면</h1>

      <p>
        이*주님, 김*국님과의 밥약이
        <br />
        만족스러우셨다면, 보은을 통해 마음을 전해 보세요.
      </p>

      {/* 💡 CharacterImage 컴포넌트가 살아나도록 가져온 SVG 이미지를 src에 바로 매핑 */}
      <CharacterImage
        src={satisfiedImage}
        alt="만족한 밥풀이"
        className="thanks-character"
      />

      {/* 💡 기존 스타일(white-button)을 유지한 채 마이페이지로 이동하도록 처리 */}
      <button className="white-button" type="button" onClick={handleConfirm}>
        보은 하기
      </button>
    </div>
  );
}

export default ThanksPage;