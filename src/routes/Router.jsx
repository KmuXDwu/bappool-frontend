import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignupPage from "../pages/auth/SignupPage";
import MyPage from "../pages/profile/MyPage";
import MatchListPage from "../pages/matching/MatchListPage";
import CompletePage from "../pages/matching/CompletePage";
import ChatPage from "../pages/chat/ChatPage";
import GuidePage from "../pages/guide/GuidePage";
import MapPage from "../pages/map/MapPage";

const IMAGES = {
  profileSmall: "/images/profile1.svg",
  satisfied: "/images/profile2_satisfied.svg",
  sad: "/images/profile3_sad.svg",
  profileD: "/images/profile4_D.svg",
  profileK: "/images/profile4_K.svg",
  chatRiceBack: "/images/bap_back.svg",

  navMap: "/images/map.svg",
  navChat: "/images/chat.svg",
  navBap: "/images/bap.svg",
  navBapBg: "/images/bap_circle_bg.svg",
  navBarBg: "/images/subtract.svg",
  navFind: "/images/find.svg",
  navKnowledge: "/images/knowledge.svg",
};

const PEOPLE = [
  {
    id: 1,
    name: "김*국",
    fullName: "김종국",
    gradeRole: "2 | 학번 선배",
    department: "컴퓨터공학과",
    mbti: "ISTP",
    hobby: "분좋카 찾아서 카공하기",
    age: "25살",
    available: false,
    statusText: "밥약 불가능",
    image: IMAGES.profileK,
    tags: ["이번달 지갑 방전", "문화예술경영", "교환학생 / 대외활동"],
  },
  {
    id: 2,
    name: "안*리",
    fullName: "안유리",
    gradeRole: "3 | 학번 선배",
    department: "사회과학대학",
    mbti: "ENFP",
    hobby: "동아리 공연 보기",
    age: "24살",
    available: true,
    statusText: "밥약 가능",
    image: IMAGES.profileSmall,
    tags: ["밥약 연락 환영", "HCI 사이언스", "자취 / 통학"],
  },
  {
    id: 3,
    name: "한*서",
    fullName: "한민서",
    gradeRole: "4 | 학번 선배",
    department: "미디어커뮤니케이션",
    mbti: "INTJ",
    hobby: "새내기 맛집 찾기",
    age: "26살",
    available: true,
    statusText: "밥약 가능",
    image: IMAGES.profileK,
    tags: ["밥약 연락 환영", "새내기를 보고싶어요", "동아리 / 학회"],
  },
];

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />

        
        {/* 3번: 밥약 잡기 목록 화면 */}
        <Route 
          path="/matching" 
          element={
            <MatchListPage 
              people={PEOPLE} 
              images={IMAGES} 
              onSelectPerson={(person) => {
                console.log("선택된 사람:", person);
                // 나중에 상세페이지(/matching/:id)로 이동하는 로직이 들어갈 자리입니다.
                window.location.href = `/chat`; 
              }} 
            />
          } 
        />

        {/* 4번: 채팅방 화면 */}
        <Route 
          path="/chat" 
          element={
            <ChatPage 
              partner={PEOPLE[1]} // 우선 기본값으로 2번째 선배(안유리)와 대화하도록 세팅
              images={IMAGES} 
              onBack={() => window.location.href = "/matching"} 
            />
          } 
        />

        {/* 밥약 신청 완료 화면 */}
        <Route 
          path="/complete" 
          element={
            <CompletePage 
              onHome={() => window.location.href = "/matching"} 
            />
          } 
        />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;