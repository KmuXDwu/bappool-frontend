import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import CharacterImage from "../../components/CharacterImage";
import thanksImage from "../../assets/images/kmu_freshman.png";

function ThanksPage() {
  const navigate = useNavigate();

  return (
    <div className="mobile-page thanks-page">
      <BackButton onClick={() => navigate(-1)} />

      <h1>밥약에 만족하셨다면</h1>

      <p>
        이*주님, 김*국님과의 밥약이
        <br />
        만족스러우셨다면, 보은을 통해 마음을 전해 보세요.
      </p>

      <CharacterImage
        src={thanksImage}
        alt="보은 캐릭터"
        className="thanks-character"
      />

      <button className="white-button" type="button" onClick={() => navigate("/mypage")}>
        보은 하기
      </button>
    </div>
  );
}

export default ThanksPage;
