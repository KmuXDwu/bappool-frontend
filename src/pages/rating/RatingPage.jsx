import BackButton from "../../components/BackButton";
import CharacterImage from "../../components/CharacterImage";

function RatingPage({ images, onBack, onSatisfied, onUnsatisfied }) {
  return (
    <div className="mobile-page rating-page">
      <BackButton onClick={onBack} />

      <h1>
        오늘 밥약,
        <br />
        어땠나요?
      </h1>

      <div className="rating-options">
        <button type="button" onClick={onSatisfied}>
          <CharacterImage
            src={images.satisfied}
            alt=""
            className="rating-face satisfied-ring"
          />
          <span>만족해요</span>
        </button>

        <button type="button" onClick={onUnsatisfied}>
          <CharacterImage
            src={images.sad}
            alt=""
            className="rating-face sad-ring"
          />
          <span>불편해요</span>
        </button>
      </div>
    </div>
  );
}

export default RatingPage;
