import { useState } from 'react';
import { ArrowLeft, Sparkles, Star, Clock } from 'lucide-react';
import { restaurants, Restaurant } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

type SurpriseViewProps = {
  onBack: () => void;
  onRestaurantClick: (restaurant: Restaurant) => void;
};

export function SurpriseView({ onBack, onRestaurantClick }: SurpriseViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only non-Italian restaurants and shuffle for surprise effect
  const [shuffledRestaurants] = useState(() => {
    const otherRestaurants = restaurants.filter(r => r.categoryType === 'other');
    return [...otherRestaurants].sort(() => Math.random() - 0.5);
  });

  const currentRestaurant = shuffledRestaurants[currentIndex];

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < shuffledRestaurants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-purple-600 relative overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5" />
            <span>Me Surpreenda!</span>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="px-4 py-2 flex gap-1">
        {shuffledRestaurants.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
          >
            <div
              className={`h-full bg-white transition-all duration-300 ${
                index === currentIndex ? 'w-full' : index < currentIndex ? 'w-full' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Card Container */}
      <div className="px-4 py-8 flex items-center justify-center min-h-[calc(100vh-180px)] relative">
        {/* Left Click Area */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer"
          aria-label="Anterior"
          disabled={currentIndex === 0}
        />

        {/* Right Click Area */}
        <button
          onClick={goToNext}
          className="absolute right-0 top-0 bottom-0 w-1/3 z-10 cursor-pointer"
          aria-label="Próximo"
          disabled={currentIndex === shuffledRestaurants.length - 1}
        />

        <div className="relative w-full">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Square Image */}
            <div className="relative aspect-square">
              <ImageWithFallback
                src={currentRestaurant.image}
                alt={currentRestaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Restaurant Info */}
            <div className="p-6">
              <h2 className="text-gray-900 mb-2">{currentRestaurant.name}</h2>
              <p className="text-gray-600 mb-4">{currentRestaurant.category}</p>

              <div className="flex items-center gap-4 text-gray-700">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span>{currentRestaurant.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{currentRestaurant.deliveryTime}</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-purple-600 text-white py-4 rounded-xl hover:shadow-lg transition-shadow"
                onClick={() => onRestaurantClick(currentRestaurant)}
              >
                Ver Cardápio
              </button>
            </div>
          </div>

          {/* Counter */}
          <div className="text-center mt-6 text-white/80 text-sm">
            <p>{currentIndex + 1} de {shuffledRestaurants.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}