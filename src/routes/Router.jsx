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
import { PEOPLE } from "../mocks/people";
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
