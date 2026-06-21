import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignupPage from "../pages/auth/SignupPage";
import ChatListPage from "../pages/chat/ChatListPage";
import ChatPage from "../pages/chat/ChatPage";
import GuidePage from "../pages/guide/GuidePage";
import LoginPage from "../pages/login/LoginPage";
import MapPage from "../pages/map/MapPage";
import CompletePage from "../pages/matching/CompletePage";
import MatchListPage from "../pages/matching/MatchListPage";
import ProfileDetailPage from "../pages/matching/ProfileDetailPage";
import MyPage from "../pages/profile/MyPage";
import RestaurantDetailPage from "../pages/restaurant/RestaurantDetailPage";
import RestaurantListPage from "../pages/restaurant/RestaurantListPage";

const IMAGES = {
  profileSmall: "/src/assets/images/profile1.svg",
  profileK: "/src/assets/images/profile4_K.svg",
  profileD: "/src/assets/images/profile_1.svg",
  satisfied: "/src/assets/images/profile2_satisfied.svg",
  sad: "/src/assets/images/profile3_sad.svg",
  chatRiceBack: "/src/assets/images/bap_back.svg",

  navMap: "/src/assets/images/map.svg",
  navChat: "/src/assets/images/chat.svg",
  navBap: "/src/assets/images/bap.svg",
  navBapBg: "/src/assets/images/bap_circle_bg.svg",
  navBarBg: "/src/assets/images/subtract.svg",
  navFind: "/src/assets/images/find.svg",
  navKnowledge: "/src/assets/images/knowledge.svg",
};

const PEOPLE = [
  {
    id: 1,
    name: "김종국",
    maskedName: "김*국",
    gradeRole: "21학번 선배",
    department: "컴퓨터공학과",
    mbti: "ISTP",
    hobby: "분좋카 찾아서 카공하기",
    age: "25살",
    available: false,
    statusText: "밥약 불가능",
    image: IMAGES.profileK,
    tags: ["이번달 지갑 방전", "문화예술경영", "교환학생 / 대외활동"],
    interests: ["학교 생활", "교환학생 / 대외활동"],
  },
  {
    id: 2,
    name: "박지은",
    maskedName: "박*은",
    gradeRole: "23학번 선배",
    department: "사회과학대학",
    mbti: "ENFP",
    hobby: "동아리 공연 보기",
    age: "24살",
    available: true,
    statusText: "밥약 가능",
    image: IMAGES.profileSmall,
    stamp: "D",
    tags: ["밥약 연락 환영", "HCI 사이언스", "자취 / 통학"],
    interests: ["HCI 사이언스", "자취 / 통학"],
  },
  {
    id: 3,
    name: "한민서",
    maskedName: "한*서",
    gradeRole: "24학번 선배",
    department: "미디어커뮤니케이션",
    mbti: "INTJ",
    hobby: "새내기 맛집 찾기",
    age: "26살",
    available: true,
    statusText: "밥약 가능",
    image: IMAGES.profileD,
    stamp: "D",
    tags: ["밥약 연락 환영", "새내기를 보고싶어요", "동아리 / 학회"],
    interests: ["미디어커뮤니케이션", "동아리 / 학회"],
  },
];

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route
          path="/matching"
          element={<MatchListPage people={PEOPLE} images={IMAGES} />}
        />
        <Route path="/detail" element={<ProfileDetailPage />} />
        <Route path="/messages" element={<ChatListPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/restaurants" element={<RestaurantListPage />} />
        <Route
          path="/restaurants/:restaurantId"
          element={<RestaurantDetailPage />}
        />
        <Route path="/complete" element={<CompletePage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
