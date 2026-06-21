import { useNavigate } from "react-router-dom";

export const RESTAURANTS = [
  {
    id: "udon",
    name: "역전우동",
    tags: ["혼밥✅", "브레이크 타임❌", "10:00~20:00"],
    address: "서울 성북구 화랑로13길 8",
    menu: "돈까스덮밥, 우동",
    price: "8,000원대",
    imageClass: "udon",
  },
  {
    id: "katsu",
    name: "유메노카츠",
    tags: ["혼밥✅", "브레이크 타임❌", "11:00~21:00"],
    address: "서울 성북구 월곡로 74",
    menu: "카츠정식, 김치나베",
    price: "9,000원대",
    imageClass: "katsu",
  },
  {
    id: "sushi-show",
    name: "스시쇼",
    tags: ["혼밥✅", "브레이크 타임⭕", "11:30~21:30"],
    address: "서울 성북구 오패산로 56",
    menu: "초밥 세트, 우동",
    price: "10,000원대",
    imageClass: "sushi",
  },
  {
    id: "sushima",
    name: "스시이마",
    tags: ["혼밥✅", "브레이크 타임⭕", "11:30~22:00"],
    address: "서울 성북구 화랑로 91",
    menu: "초밥 정식, 우동",
    price: "10,000원대",
    imageClass: "set",
  },
];

function RestaurantListPage() {
  const navigate = useNavigate();

  return (
    <main className="mobile-page restaurant-list-page">
      <button
        className="restaurant-list-back"
        type="button"
        onClick={() => navigate(-1)}
        aria-label="뒤로가기"
      >
        ←
      </button>

      <h1>월곡 일식 맛ZIP</h1>

      <section className="restaurant-list">
        {RESTAURANTS.map((restaurant) => (
          <button
            className="restaurant-card"
            key={restaurant.id}
            type="button"
            onClick={() => navigate(`/restaurants/${restaurant.id}`)}
          >
            <div className={`restaurant-image ${restaurant.imageClass}`} />

            <div className="restaurant-copy">
              <h2>{restaurant.name}</h2>

              <div className="restaurant-tags">
                {restaurant.tags.map((tag, index) => (
                  <span className={`food-tag tag-${index}`} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </section>
    </main>
  );
}

export default RestaurantListPage;
