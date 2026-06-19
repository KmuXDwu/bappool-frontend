// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import LoginPage from "../pages/auth/LoginPage";
// import SignupPage from "../pages/auth/SignupPage";

// import MyPage from "../pages/profile/MyPage";
// import EditProfilePage from "../pages/profile/EditProfilePage";
// import TimetablePage from "../pages/profile/TimetablePage";

// import MatchRecommendPage from "../pages/matching/MatchRecommendPage";
// import MatchDetailPage from "../pages/matching/MatchDetailPage";
// import ReceivedRequestsPage from "../pages/matching/ReceivedRequestsPage";
// import SentRequestsPage from "../pages/matching/SentRequestsPage";

// function Router() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />

//         <Route path="/signup" element={<SignupPage />} />

//         <Route path="/mypage" element={<MyPage />} />
//         <Route path="/profile/edit" element={<EditProfilePage />} />
//         <Route path="/profile/timetable" element={<TimetablePage />} />

//         <Route path="/matching" element={<MatchRecommendPage />} />
//         <Route path="/matching/:id" element={<MatchDetailPage />} />

//         <Route
//           path="/matching/received"
//           element={<ReceivedRequestsPage />}
//         />

//         <Route
//           path="/matching/sent"
//           element={<SentRequestsPage />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default Router;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignupPage from "../pages/auth/SignupPage";
import MyPage from "../pages/profile/MyPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;