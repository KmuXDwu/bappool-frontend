import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DEFAULT_PARTNER = {
  id: "default",
  name: "채팅방",
  maskedName: "채팅방",
  image: "/src/assets/images/kmu_senior.png",
};

// 💡 임시 현재 로그인 유저 역할 세팅 ('senior' 또는 'freshman'으로 테스트해 보세요!)
const CURRENT_USER_ROLE = "Freshman"; 

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
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 💡 대화 종료 모달 상태 추가
  
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

  const handleOpenRestaurants = () => {
    navigate("/restaurants", {
      state: {
        partner,
      },
    });
  };

  // 💡 대화 종료 모달 안에서 '확인'을 눌렀을 때 분기 처리 함수
  const handleConfirmExit = () => {
    setIsModalOpen(false);
    if (CURRENT_USER_ROLE === "senior") {
      navigate("/mypage"); // 선배는 마이페이지로 이동
    } else {
      navigate("/rating", { state: { partner } }); // 후배는 평가 페이지로 이동
    }
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
          ←
        </button>
        <h1>{partnerName}</h1>
        
        {/* 💡 헤더 우측에 대화 종료 버튼 추가 */}
        <button 
          className="chat-exit-btn" 
          type="button" 
          onClick={() => setIsModalOpen(true)}
        >
          대화 종료
        </button>
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
