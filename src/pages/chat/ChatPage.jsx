import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DEFAULT_PARTNER = {
  id: "default",
  name: "채팅방",
  maskedName: "채팅방",
  image: "/src/assets/images/kmu_senior.png",
};

// 💡 임시 현재 로그인 유저 역할 세팅 ('senior' 또는 'freshman'으로 테스트해 보세요!)
const CURRENT_USER_ROLE = "Freshman"; // "senior" 또는 "freshman"으로 테스트 가능

function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const partner = location.state?.partner || DEFAULT_PARTNER;
  const partnerName = partner.maskedName || partner.name || "채팅방";
  const profileImage = partner.image || DEFAULT_PARTNER.image;
  const riceBackground = "/src/assets/images/bap_back.svg";

  const roomStorageKey = useMemo(
    () => `bappul-chat-room-${partner.id || partnerName}`,
    [partner.id, partnerName],
  );

  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 💡 커스텀 모달 상태 추가
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem(roomStorageKey);

    if (savedMessages) {
      try {
        return JSON.parse(savedMessages);
      } catch {
        localStorage.removeItem(roomStorageKey);
      }
    }

    return [
      {
        id: "system-created",
        type: "system",
        text: `${partnerName}님과의 밥약 채팅방이 생성되었습니다.`,
      },
    ];
  });

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

  // 💡 플러스(+) 버튼 클릭 (선배: 맛집리스트 이동 / 후배: 먹통)
  const handlePlusClick = (e) => {
    e.stopPropagation();
    if (CURRENT_USER_ROLE === "senior") {
      navigate("/rating", { state: { partner } }); 
    }
  };

  // 💡 커스텀 모달 안에서 '확인(종료)'을 눌렀을 때 실행되는 함수
  const handleConfirmExit = () => {
    setIsModalOpen(false);
    if (CURRENT_USER_ROLE === "senior") {
      navigate("/mypage");  // ➔ 선배는 확실하게 마이페이지로!
    } else {
      navigate("/rating", { state: { partner: partner } });  // ➔ 후배는 평가 페이지로!
    }
  };

  return (
    <main className="chat-page">
      {/* 헤더 영역 */}
      <header className="chat-header">
        <button
          className="chat-back"
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
        >
          ←
        </button>
        <h1>{partnerName}</h1>
        {/* 대화 종료 버튼 누르면 커스텀 모달을 염 */}
        <button 
          className="chat-exit-btn" 
          type="button" 
          onClick={() => setIsModalOpen(true)}
        >
          대화 종료
        </button>
      </header>

      {/* 채팅 메인 룸 */}
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

      {/* 하단 입력창 구역 */}
      <section className="chat-input-area">
        <div className="chat-input-bar">
          <button 
            type="button" 
            className="chat-plus" 
            aria-label="추가"
            onClick={handlePlusClick}
          >
            +
          </button>

          <input
            ref={inputRef}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="메시지 입력"
            onClick={handleFocusInput}
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

      {/* 💡 깔끔한 대화종료 커스텀 팝업 모달 */}
      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>대화 종료</h3>
            <p>정말 밥약 대화를 종료하시겠습니까?</p>
            <div className="custom-modal-buttons">
              <button className="modal-btn-cancel" onClick={() => setIsModalOpen(false)}>
                취소
              </button>
              <button className="modal-btn-confirm" onClick={handleConfirmExit}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ChatPage;