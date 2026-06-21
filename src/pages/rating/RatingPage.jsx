import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import CharacterImage from "../../components/CharacterImage";

// 💡 프로젝트 에셋 폴더에서 이미지를 직접 가져옵니다. (확장자가 다르면 수정하세요!)
import satisfiedImage from "../../assets/images/profile2_satisfied.svg";
import sadImage from "../../assets/images/profile3_sad.svg";

function RatingPage() {
  const navigate = useNavigate();

  // 만족해요 -> ThanksPage로 이동
  const handleSatisfied = () => {
    navigate("/ThanksPage"); 
  };

  // 불편해요 -> ReportPage로 이동
  const handleUnsatisfied = () => {
    navigate("/ReportPage"); 
  };

  return (
    <div className="mobile-page rating-page">
      {/* 뒤로가기 버튼 클릭 시 이전 화면으로 이동 */}
      <BackButton onClick={() => navigate(-1)} />

      <h1>
        오늘 밥약,
        <br />
        어땠나요?
      </h1>

      <div className="rating-options">
        <button type="button" onClick={handleSatisfied}>
          <CharacterImage
            src={satisfiedImage} // 💡 위에서 import한 이미지 직접 매핑
            alt="만족해요"
            className="rating-face satisfied-ring"
          />
          <span>만족해요</span>
        </button>

        <button type="button" onClick={handleUnsatisfied}>
          <CharacterImage
            src={sadImage} // 💡 위에서 import한 이미지 직접 매핑
            alt="불편해요"
            className="rating-face sad-ring"
          />
          <span>불편해요</span>
        </button>
      </div>
    </div>
  );
}

export default RatingPage;