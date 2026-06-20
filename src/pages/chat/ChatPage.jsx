import { useState } from "react";
import { useNavigate } from "react-router-dom";

const restaurants = [
  {
    id: 1,
    name: "역전우동",
    desc: "혼밥 가능 / 브레이크 타임 없음 / 10:00~20:00",
  },
  {
    id: 2,
    name: "유메노카츠",
    desc: "혼밥 가능 / 브레이크 타임 없음 / 11:00~21:00",
  },
  {
    id: 3,
    name: "스시쇼",
    desc: "혼밥 가능 / 브레이크 타임 있음 / 11:30~21:30",
  },
];

function ChatPage() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { id: 1, type: "left", text: "양식 중식 일식 중에 땡기는 거 있으세요?" },
    {
      id: 2,
      type: "right",
      text: "저는 다 좋긴 한데 일식이 제일 좋긴 해요 ㅎㅎ",
    },
    { id: 3, type: "left", text: "여기서 골라보시겠어요?" },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);

  const profileImage = "/src/assets/images/kmu_senior.png";
  const riceBackground = "/src/assets/images/bap_back.svg";

  const handleSendText = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "right",
        text: inputValue.trim(),
      },
    ]);

    setInputValue("");
  };

  const handleSendRestaurant = (restaurant) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "right",
        text: `${restaurant.name} 어때요?`,
      },
    ]);

    setIsRestaurantOpen(false);
  };

  return (
    <main className="chat-page">
      <div className="chat-status-bar">
        <span>16:52</span>
        <span>▮▮▮ LTE ▰</span>
      </div>

      <header className="chat-header">
        <button
          className="chat-back"
          type="button"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h1>김*국</h1>
      </header>

      <section
        className="chat-room"
        style={{ backgroundImage: `url(${riceBackground})` }}
      >
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message-row ${message.type}`}
            >
              {message.type === "left" && (
                <img className="chat-avatar" src={profileImage} alt="" />
              )}

              <p
                className={`chat-bubble ${
                  message.type === "left" ? "orange" : "gray"
                }`}
              >
                {message.text}
              </p>
            </div>
          ))}

          <p className="chat-system-text">
            -김*국님이 리스트를 전송하였습니다.-
          </p>

          <div className="chat-message-row left">
            <img className="chat-avatar" src={profileImage} alt="" />
            <button
              className="chat-bubble orange restaurant-link"
              type="button"
              onClick={() => setIsRestaurantOpen(true)}
            >
              [월곡 일식 맛ZIP. 눌러서 열기]
            </button>
          </div>
        </div>
      </section>

      <section className="chat-input-area">
        <div className="chat-input-bar">
          <button type="button" className="chat-plus">
            +
          </button>

          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="메시지 입력"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendText();
              }
            }}
          />

          <button type="button" className="chat-face">
            ☻
          </button>

          <button type="button" className="chat-send" onClick={handleSendText}>
            {inputValue.trim() ? "전송" : "#"}
          </button>
        </div>

        <FakeKeyboard />
      </section>

      {isRestaurantOpen && (
        <div className="chat-bottom-sheet">
          <div className="chat-sheet-panel">
            <div className="chat-sheet-handle" />

            <header className="chat-sheet-header">
              <h2>월곡 일식 맛ZIP</h2>
              <button type="button" onClick={() => setIsRestaurantOpen(false)}>
                완료
              </button>
            </header>

            <div className="chat-restaurant-list">
              {restaurants.map((restaurant) => (
                <button
                  key={restaurant.id}
                  type="button"
                  className="chat-restaurant-card"
                  onClick={() => handleSendRestaurant(restaurant)}
                >
                  <strong>{restaurant.name}</strong>
                  <span>{restaurant.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState("");

  const profileImage = "/src/assets/images/kmu_senior.png";
  const riceBackground = "/src/assets/images/bap_back.svg";

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  const handleCloseKeyboard = () => {
    inputRef.current?.blur();
  };

  const handleSendText = () => {
    if (!inputValue.trim()) return;
    setInputValue("");
  };

  return (
    <main className="chat-page">
      <div className="chat-status-bar">
        <span>16:52</span>
        <span>▮▮▮ LTE ▰</span>
      </div>

      <header className="chat-header">
        <button
          className="chat-back"
          type="button"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h1>김*국</h1>
      </header>

      <section
        className="chat-room"
        style={{ backgroundImage: `url(${riceBackground})` }}
        onClick={handleCloseKeyboard}
      >
        <div className="chat-messages">
          <div className="chat-message-row left">
            <img className="chat-avatar" src={profileImage} alt="" />
            <p className="chat-bubble orange">
              양식 중식 일식 중에 땡기는 거 있으세요?
            </p>
          </div>

          <div className="chat-message-row right">
            <p className="chat-bubble gray">
              저는 다 좋긴 한데 일식이 제일 좋긴 해요 ㅎㅎ
            </p>
          </div>

          <div className="chat-message-row left">
            <img className="chat-avatar" src={profileImage} alt="" />
            <p className="chat-bubble orange">여기서 골라보시겠어요?</p>
          </div>

          <p className="chat-system-text">
            -김*국님이 리스트를 전송하였습니다.-
          </p>

          <div className="chat-message-row left">
            <img className="chat-avatar" src={profileImage} alt="" />
            <button
              className="chat-bubble orange restaurant-link"
              type="button"
            >
              [월곡 일식 맛ZIP. 눌러서 열기]
            </button>
          </div>
        </div>
      </section>

      <section className="chat-input-area">
        <div className="chat-input-bar" onClick={handleFocusInput}>
          <button type="button" className="chat-plus">
            +
          </button>

          <input
            ref={inputRef}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="메시지 입력"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendText();
              }
            }}
          />

          <button type="button" className="chat-face">
            ☻
          </button>

          <button type="button" className="chat-send" onClick={handleSendText}>
            {inputValue.trim() ? "전송" : "#"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default ChatPage;
