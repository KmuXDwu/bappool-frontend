const sortOptions = [
  "가나다순 정렬",
  "음식 종류별",
  "만원 이하 가성비 식사",
  "학교 근처 가심비 식당",
];

function SortBottomSheet({ onClose, onChoose }) {
  return (
    <div className="sheet-layer">
      <div className="sheet-dim" />

      <section className="sort-sheet">
        <header>
          <span />
          <h2>가게 리스트 보기</h2>
          <button type="button" onClick={onClose}>
            완료
          </button>
        </header>

        <div className="sort-options">
          {sortOptions.map((option) => (
            <button key={option} type="button" onClick={() => onChoose(option)}>
              {option}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SortBottomSheet;
