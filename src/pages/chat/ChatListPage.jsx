import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../../components/BottomNav";

const CHAT_USERS = [
  {
    id: "park-eun",
    name: "박지은",
    maskedName: "박*은",
    gradeRole: "23학번 선배",
    department: "사회과학대학",
    mbti: "ENFP",
    hobby: "동아리 공연 보기",
    age: "24살",
    available: true,
    statusText: "밥약 가능",
    image: "/src/assets/images/profile_1.svg",
    tags: ["밥약 연락 환영", "HCI 사이언스", "자취 / 통학"],
    interests: ["HCI 사이언스", "자취 / 통학"],
    preview: "네, 거기서 만나요!",
    time: "2시간 전",
    disabled: false,
  },
  {
    id: "kim-jongkook",
    name: "김종국",
    maskedName: "김*국",
    image: "/src/assets/images/profile4_K.svg",
    preview: "밥약이 완료되어 더이상 이용할 수 없는 채팅방입니다.",
    time: "2주전",
    disabled: true,
  },
  {
    id: "han-minseo",
    name: "한민서",
    maskedName: "한*서",
    image: "/src/assets/images/profile_1.svg",
    preview: "밥약이 완료되어 더이상 이용할 수 없는 채팅방입니다.",
    time: "3주전",
    disabled: true,
  },
];

const RECOMMENDED_USERS = [
  {
    id: "cho-ji",
    name: "조희지",
    maskedName: "조*지",
    image: "/src/assets/images/profile_4.svg",
    gradeRole: "22학번 선배",
    department: "데이터사이언스",
    mbti: "ENFJ",
    hobby: "산책",
    age: "22살",
    available: false,
    statusText: "추천 친구",
    displayMaskedName: true,
    stamp: "D",
    tags: ["교환학생 / 대외활동", "학교 생활"],
    interests: ["교환학생 / 대외활동", "학교 생활"],
  },
  {
    id: "hwang-ha",
    name: "황예하",
    maskedName: "황*하",
    image: "/src/assets/images/profile_1.svg",
    gradeRole: "25학번 선배",
    department: "경영학과",
    mbti: "ENTP",
    hobby: "독서",
    age: "25살",
    available: false,
    statusText: "추천 친구",
    displayMaskedName: true,
    tags: ["동아리 / 학회", "자취 통학"],
    interests: ["동아리 / 학회", "자취 통학"],
  },
  {
    id: "ban-tae",
    name: "반민태",
    maskedName: "반*태",
    image: "/src/assets/images/profile_3.svg",
    gradeRole: "21학번 선배",
    department: "컴퓨터공학과",
    mbti: "INTP",
    hobby: "코딩",
    age: "21살",
    available: false,
    statusText: "추천 친구",
    displayMaskedName: true,
    tags: ["동아리 / 학회", "학과 공부"],
    interests: ["동아리 / 학회", "학과 공부"],
  },
];

function ChatListPage() {
  const navigate = useNavigate();
  const [isClosedModalOpen, setIsClosedModalOpen] = useState(false);

  const handleSelectChat = (user) => {
    if (user.disabled) {
      setIsClosedModalOpen(true);
      return;
    }

    navigate("/chat", {
      state: {
        partner: user,
      },
    });
  };

  return (
    <main className="mobile-page chat-list-page">
      <button
        className="chat-list-back"
        type="button"
        aria-label="뒤로가기"
        onClick={() => navigate(-1)}
      >
        ←
      </button>

      <section className="chat-list-content">
        <h1>메세지</h1>

        <div className="chat-list-section">
          {CHAT_USERS.map((user) => (
            <button
              className="chat-list-item"
              key={user.id}
              type="button"
              onClick={() => handleSelectChat(user)}
            >
              <img className="chat-list-avatar" src={user.image} alt="" />

              <div className="chat-list-copy">
                <strong>{user.maskedName}</strong>
                <span>{user.preview}</span>
              </div>

              <time>{user.time}</time>
            </button>
          ))}
        </div>

        <h2>추천 친구</h2>

        <div className="chat-list-section recommended">
          {RECOMMENDED_USERS.map((user) => (
            <button
              className="chat-list-item"
              key={user.id}
              type="button"
              onClick={() =>
                navigate("/detail", {
                  state: {
                    person: user,
                  },
                })
              }
            >
              <img className="chat-list-avatar" src={user.image} alt="" />

              <div className="chat-list-copy">
                <strong>{user.maskedName}</strong>
                <span>눌러서 프로필 보기</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <BottomNav />

      {isClosedModalOpen && (
        <div
          className="chat-closed-modal-layer"
          onClick={() => setIsClosedModalOpen(false)}
        >
          <section
            className="chat-closed-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <p>밥약이 완료되어 더이상 이용할 수 없는 채팅방입니다.</p>
            <button type="button" onClick={() => setIsClosedModalOpen(false)}>
              확인
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default ChatListPage;
