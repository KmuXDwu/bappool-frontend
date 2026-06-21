import { Check, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom"; // 💡 추가
import BackButton from "../../components/BackButton";

function RestaurantListPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 💡 ChatPage에서 navigate하면서 넘겨줄 맛집 데이터와 선택 함수를 받아옵니다.
  const restaurants = location.state?.restaurants || [];
  
  // 맛집 선택 시 다시 채팅방으로 돌아가면서 선택된 맛집 데이터를 들고 가도록 처리
  const handleSelect = (restaurant) => {
    navigate(-1, { state: { selectedRestaurant: restaurant } });
  };

  return (
    <div className="mobile-page restaurant-list-page">
      {/* 💡 누르면 다시 채팅방으로 뒤로가기 */}
      <BackButton onClick={() => navigate(-1)} className="restaurant-back-button" />

      <h1>월곡 일식 맛ZIP</h1>

      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <button
            className="restaurant-card"
            key={restaurant.id}
            type="button"
            onClick={() => handleSelect(restaurant)} // 💡 수정
          >
            {restaurant.image ? (
              <img className="restaurant-image" src={restaurant.image} alt="" />
            ) : (
              <div className="restaurant-image placeholder" />
            )}

            <div className="restaurant-copy">
              <h2>{restaurant.name}</h2>

              <div className="restaurant-tags">
                {restaurant.tags.map((tag, index) => (
                  <span className={`food-tag tag-${index}`} key={tag}>
                    {tag}
                    {index === 0 && <Check size={13} />}
                    {index === 1 && <X size={13} />}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RestaurantListPage;