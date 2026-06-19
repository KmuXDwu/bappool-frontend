const rows = [
  ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"],
  ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
  ["⇧", "ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ", "⌫"],
];

function FakeKeyboard() {
  return (
    <div className="fake-keyboard" aria-hidden="true">
      <div className="suggestions">
        <span>나</span>
        <span>아</span>
        <span>나는</span>
      </div>

      {rows.map((row) => (
        <div className="key-row" key={row.join("")}>
          {row.map((key) => (
            <span className={key.length > 1 ? "wide-key" : ""} key={key}>
              {key}
            </span>
          ))}
        </div>
      ))}

      <div className="key-row command-row">
        <span>123</span>
        <span>☻</span>
        <span className="space-key">스페이스</span>
        <span>↵</span>
      </div>
    </div>
  );
}

export default FakeKeyboard;
