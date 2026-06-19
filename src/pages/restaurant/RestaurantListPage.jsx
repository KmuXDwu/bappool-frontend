import { Check, X } from "lucide-react";
import BackButton from "../../components/BackButton";

function RestaurantListPage({ restaurants, onBack, onSelectRestaurant }) {
  return (
    <div className="mobile-page restaurant-list-page">
      <BackButton onClick={onBack} className="restaurant-back-button" />

      <h1>월곡 일식 맛ZIP</h1>

      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <button
            className="restaurant-card"
            key={restaurant.id}
            type="button"
            onClick={() => onSelectRestaurant(restaurant)}
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
