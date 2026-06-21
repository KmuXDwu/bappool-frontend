import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DEFAULT_PARTNER = {
  id: "default",
  name: "채팅방",
  maskedName: "채팅방",
  image: "/src/assets/images/kmu_senior.png",
};

function createInitialMessages(partnerName) {
  return [
    {
      id: "system-created",
      type: "system",
      text: `${partnerName}님과의 밥약 채팅방이 생성되었습니다.`,
    },
  ];
}

function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const partner = location.state?.partner || DEFAULT_PARTNER;
  const partnerName = partner.maskedName || partner.name || DEFAULT_PARTNER.maskedName;
  const profileImage = partner.image || DEFAULT_PARTNER.image;
  const riceBackground = "/src/assets/images/bap_back.svg";

  const roomStorageKey = useMemo(
    () => `bappul-chat-room-v2-${partner.id || partnerName}`,
    [partner.id, partnerName],
  );

  const [inputValue, setInputValue] = useState("");
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(roomStorageKey);

    if (savedMessages) {
      try {
        return JSON.parse(savedMessages);
      } catch {
        localStorage.removeItem(roomStorageKey);
      }
    }

    return createInitialMessages(partnerName);
  });

  useEffect(() => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("bappul-chat-room-") && !key.startsWith("bappul-chat-room-v2-"))
      .forEach((key) => localStorage.removeItem(key));
  }, []);

  useEffect(() => {
    setMessages((prevMessages) => {
      const [firstMessage, ...restMessages] = prevMessages;

      if (firstMessage?.type !== "system") {
        return createInitialMessages(partnerName);
      }

      return [
        {
          ...firstMessage,
          text: `${partnerName}님과의 밥약 채팅방이 생성되었습니다.`,
        },
        ...restMessages.filter((message) => message.text !== "dkssud"),
      ];
    });
  }, [partnerName]);

  useEffect(() => {
    localStorage.setItem(roomStorageKey, JSON.stringify(messages));
  }, [messages, roomStorageKey]);

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  const handleCloseKeyboard = () => {
    inputRef.current?.blur();
  };

  const handleSendText = () => {
    const nextMessage = inputValue.trim();

    if (!nextMessage) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        type: "right",
        text: nextMessage,
      },
    ]);

    setInputValue("");
  };

  const handleOpenRestaurants = () => {
    navigate("/restaurants", {
      state: {
        partner,
      },
    });
  };

  return (
    <main className="chat-page">
      <header className="chat-header">
        <button
          className="chat-back"
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          ‹
        </button>
        <h1>{partnerName}</h1>
      </header>

      <section
        className="chat-room"
        style={{ backgroundImage: `url(${riceBackground})` }}
        onClick={handleCloseKeyboard}
      >
        <div className="chat-messages">
          {messages.map((message) => {
            if (message.type === "system") {
              return (
                <p className="chat-system-text" key={message.id}>
                  -{message.text}-
                </p>
              );
            }

            return (
              <div
                className={`chat-message-row ${message.type}`}
                key={message.id}
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
            );
          })}
        </div>
      </section>

      <section className="chat-input-area">
        <div className="chat-input-bar" onClick={handleFocusInput}>
          <button
            type="button"
            className="chat-plus"
            aria-label="가게 리스트 보기"
            onClick={(event) => {
              event.stopPropagation();
              inputRef.current?.blur();
              setIsGuideOpen(true);
            }}
          >
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

          <button type="button" className="chat-face" aria-label="이모지">
            ☻
          </button>

          <button type="button" className="chat-send" onClick={handleSendText}>
            {inputValue.trim() ? "전송" : "#"}
          </button>
        </div>
      </section>

      {isGuideOpen && (
        <div className="restaurant-guide-layer">
          <button
            className="restaurant-guide-dim"
            type="button"
            aria-label="닫기"
            onClick={() => setIsGuideOpen(false)}
          />

          <section className="restaurant-guide-sheet">
            <header className="restaurant-guide-header">
              <h2>가게 리스트 보기</h2>
              <button type="button" onClick={() => setIsGuideOpen(false)}>
                완료
              </button>
            </header>

            <div className="restaurant-guide-options">
              <button type="button" onClick={handleOpenRestaurants}>
                가나다순 정렬
              </button>
              <button type="button" onClick={handleOpenRestaurants}>
                음식 종류별
              </button>
              <button type="button" onClick={handleOpenRestaurants}>
                만원 이하 가성비 식사
              </button>
              <button type="button" onClick={handleOpenRestaurants}>
                학교 근처 가심비 식당
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default ChatPage;
