import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import CharacterImage from "../../components/CharacterImage";
import satisfiedImage from "../../assets/images/profile2_satisfied.svg";
import sadImage from "../../assets/images/profile3_sad.svg";

function RatingPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (selected === "satisfied") {
      navigate("/thanks");
      return;
    }

    if (selected === "sad") {
      navigate("/report");
    }
  };

  return (
    <div className={`mobile-page rating-page ${selected ? "is-selected" : ""}`}>
      <BackButton onClick={() => navigate(-1)} />

      <h1>
        오늘 밥약,
        <br />
        어땠나요?
      </h1>

      <div className="rating-options">
        {(!selected || selected === "satisfied") && (
          <button
            className={`rating-option ${selected === "satisfied" ? "selected satisfied" : ""}`}
            type="button"
            onClick={() => setSelected("satisfied")}
          >
            <CharacterImage
              src={satisfiedImage}
              alt="만족해요"
              className="rating-face satisfied-ring"
            />
            <span>만족해요</span>
          </button>
        )}

        {(!selected || selected === "sad") && (
          <button
            className={`rating-option ${selected === "sad" ? "selected sad" : ""}`}
            type="button"
            onClick={() => setSelected("sad")}
          >
            <CharacterImage
              src={sadImage}
              alt="불편해요"
              className="rating-face sad-ring"
            />
            <span>불편해요</span>
          </button>
        )}
      </div>

      {selected && (
        <button className="rating-next-button" type="button" onClick={handleNext}>
          다음
        </button>
      )}
    </div>
  );
}

export default RatingPage;
