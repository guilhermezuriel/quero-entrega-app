import { useState, useEffect } from 'react';
import { RestaurantList } from './components/RestaurantList';
import { SurpriseView } from './components/SurpriseView';
import { RestaurantView } from './components/RestaurantView';
import { PedidosView } from './components/PedidosView';
import { PerfilView } from './components/PerfilView';
import { BottomBar } from './components/BottomBar';
import { ProfileSelection } from './components/ProfileSelection';

export type Restaurant = {
  id: number;
  name: string;
  image: string;
  category: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  categoryType: 'italian' | 'other'; // Para facilitar a filtragem
};

export const restaurants: Restaurant[] = [
  // Restaurantes Italianos/Massas - para "Perfeitos para você"
  {
    id: 1,
    name: "Pizzaria Bella Napoli",
    image: "https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY0MDA0MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Pizza",
    rating: 4.8,
    deliveryTime: "30-40 min",
    deliveryFee: "R$ 5,00",
    categoryType: 'italian'
  },
  {
    id: 4,
    name: "Trattoria Roma",
    image: "https://images.unsplash.com/photo-1532117472055-4d0734b51f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjQwMDExODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Italiano",
    rating: 4.7,
    deliveryTime: "35-45 min",
    deliveryFee: "R$ 6,00",
    categoryType: 'italian'
  },
  {
    id: 9,
    name: "La Pasta Fresca",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY0MDA0MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Massas",
    rating: 4.9,
    deliveryTime: "30-40 min",
    deliveryFee: "R$ 7,00",
    categoryType: 'italian'
  },
  {
    id: 10,
    name: "Pizzaria Don Luigi",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY0MDA0MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Pizza",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: "R$ 4,00",
    categoryType: 'italian'
  },
  {
    id: 11,
    name: "Cantina Di Napoli",
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxpdGFsaWFuJTIwZm9vZHxlbnwxfHx8fDE3NjQwMDQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Italiano",
    rating: 4.8,
    deliveryTime: "35-45 min",
    deliveryFee: "R$ 6,00",
    categoryType: 'italian'
  },
  
  // Restaurantes de outras categorias - para "Me Surpreenda"
  {
    id: 2,
    name: "Burger House",
    image: "https://images.unsplash.com/photo-1644447381290-85358ae625cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MzkzOTAwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Hambúrguer",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: "R$ 4,00",
    categoryType: 'other'
  },
  {
    id: 3,
    name: "Sushi Bar Sakura",
    image: "https://images.unsplash.com/photo-1696449241254-11cf7f18ce32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYzOTI4MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Japonês",
    rating: 4.9,
    deliveryTime: "40-50 min",
    deliveryFee: "R$ 8,00",
    categoryType: 'other'
  },
  {
    id: 5,
    name: "Cantina Mexicana",
    image: "https://images.unsplash.com/photo-1653084019129-1f2303bb5bc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjM5MzE1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Mexicano",
    rating: 4.5,
    deliveryTime: "30-40 min",
    deliveryFee: "R$ 5,00",
    categoryType: 'other'
  },
  {
    id: 6,
    name: "Asia Fusion",
    image: "https://images.unsplash.com/photo-1476055439777-977cdf3a5699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY0MDI0MTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Asiático",
    rating: 4.8,
    deliveryTime: "35-45 min",
    deliveryFee: "R$ 7,00",
    categoryType: 'other'
  },
  {
    id: 7,
    name: "Café & Bistrô",
    image: "https://images.unsplash.com/photo-1542372147193-a7aca54189cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwY29mZmVlfGVufDF8fHx8MTc2Mzk0NTA2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Café",
    rating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: "R$ 3,00",
    categoryType: 'other'
  },
  {
    id: 8,
    name: "Churrascaria Gaúcha",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjM5ODE0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Churrasco",
    rating: 4.9,
    deliveryTime: "40-50 min",
    deliveryFee: "R$ 8,00",
    categoryType: 'other'
  },
  {
    id: 12,
    name: "Smash Burger Co.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxidXJnZXIlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MzkzOTAwMXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Hambúrguer",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: "R$ 5,00",
    categoryType: 'other'
  },
  {
    id: 13,
    name: "Doce Sabor",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwc2hvcHxlbnwxfHx8fDE3NjQwMDQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Doceria",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: "R$ 4,00",
    categoryType: 'other'
  },
  {
    id: 14,
    name: "Sweet Dreams",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkZXNzZXJ0JTIwc2hvcHxlbnwxfHx8fDE3NjQwMDQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Doceria",
    rating: 4.9,
    deliveryTime: "30-40 min",
    deliveryFee: "R$ 6,00",
    categoryType: 'other'
  },
  {
    id: 15,
    name: "Taco Loco",
    image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtZXhpY2FuJTIwZm9vZHxlbnwxfHx8fDE3NjQwMDQzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Mexicano",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: "R$ 5,00",
    categoryType: 'other'
  }
];

export default function App() {
  const [view, setView] = useState<'home' | 'pedidos' | 'surprise' | 'perfil' | 'restaurant'>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [profile, setProfile] = useState<'frequent' | 'lapsed' | 'new' | null>(null);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setView('restaurant');
  };

  const handleNavigate = (newView: 'home' | 'pedidos' | 'surprise' | 'perfil') => {
    setView(newView);
  };

  const handleSelectProfile = (p: 'frequent' | 'lapsed' | 'new') => {
    setProfile(p);
    // persist selection
    try {
      localStorage.setItem('queroentrega_profile', p);
    } catch (e) {}
    // default to home after selection
    setView('home');
  };

  // load saved profile on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('queroentrega_profile');
      if (saved === 'frequent' || saved === 'lapsed' || saved === 'new') {
        setProfile(saved);
      }
    } catch (e) {}
  }, []);

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <RestaurantList
            onRestaurantClick={handleRestaurantClick}
            perfectTitle={
              profile === 'frequent'
                ? 'Me Surpreenda'
                : profile === 'lapsed'
                ? 'Novidades empolgantes'
                : 'Melhores do site'
            }
          />
        );
      case 'pedidos':
        return <PedidosView />;
      case 'surprise':
        return <SurpriseView onBack={() => setView('home')} onRestaurantClick={handleRestaurantClick} />;
      case 'perfil':
        return <PerfilView onChangeProfile={() => { setProfile(null); try { localStorage.removeItem('queroentrega_profile'); } catch (e) {} setView('home'); }} />;
      case 'restaurant':
        return <RestaurantView restaurant={selectedRestaurant!} onBack={() => setView('home')} />;
      default:
        return <RestaurantList onRestaurantClick={handleRestaurantClick} />;
    }
  };

  // derive recommendation lists based on profile
  const favorites = restaurants.filter(r => r.categoryType === 'italian').slice(0, 3);
  const exciting = restaurants
    .filter(r => r.rating >= 4.8 && !favorites.find(f => f.id === r.id))
    .slice(0, 6);
  const best = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 6);

  if (!profile) {
    return <ProfileSelection onSelect={handleSelectProfile} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md">
        <div>
          {renderView()}
        </div>

        {view !== 'restaurant' && view !== 'surprise' && (
          <div className="sticky bottom-0 bg-transparent">
            <BottomBar currentView={view} onNavigate={handleNavigate} />
          </div>
        )}
      </div>
    </div>
  );
}