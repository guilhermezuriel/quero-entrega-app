import { Search, MapPin, Star, Clock } from 'lucide-react';
import { restaurants, Restaurant } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PerfectForYou } from './PerfectForYou';

type RestaurantListProps = {
  onRestaurantClick: (restaurant: Restaurant) => void;
  perfectTitle?: string;
};

export function RestaurantList({ onRestaurantClick, perfectTitle }: RestaurantListProps) {
  // Get Italian restaurants for "Perfect For You" section
  const perfectRestaurants = restaurants.filter(r => r.categoryType === 'italian').slice(0, 3);
  const perfectRestaurantIds = new Set(perfectRestaurants.map(r => r.id));
  
  // Filter out restaurants that appear in "Perfect For You"
  const otherRestaurants = restaurants.filter(r => !perfectRestaurantIds.has(r.id));

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-red-500" />
          <div className="flex-1">
            <p className="text-gray-500 text-sm">Entregar em</p>
            <p>Rua das Flores, 123</p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar restaurantes..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Perfect For You Section */}
      <div className="py-6">
        <PerfectForYou
          restaurants={restaurants}
          onRestaurantClick={onRestaurantClick}
          title={perfectTitle}
        />
      </div>

      {/* Restaurant List */}
      <div className="px-4 pb-4 space-y-4">
        <h2 className="text-gray-900 mt-2">Restaurantes</h2>
        
        {otherRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onRestaurantClick(restaurant)}
          >
            <ImageWithFallback
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-gray-900 mb-1">{restaurant.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{restaurant.category}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div>
                  <span>{restaurant.deliveryFee}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}