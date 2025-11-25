import { ArrowLeft, Star, Clock, Truck, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { Restaurant } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

type RestaurantViewProps = {
  restaurant: Restaurant;
  onBack: () => void;
};

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
};

// Mock menu data
const getMenuItems = (restaurantId: number): MenuItem[] => {
  const menus: { [key: number]: MenuItem[] } = {
    1: [ // Pizzaria
      { id: 1, name: "Pizza Margherita", description: "Molho de tomate, mussarela e manjericão", price: 45.90, category: "Pizzas" },
      { id: 2, name: "Pizza Calabresa", description: "Calabresa, cebola e azeitonas", price: 48.90, category: "Pizzas" },
      { id: 3, name: "Pizza Quatro Queijos", description: "Mussarela, gorgonzola, parmesão e provolone", price: 52.90, category: "Pizzas" },
      { id: 4, name: "Refrigerante Lata", description: "350ml", price: 6.00, category: "Bebidas" },
    ],
    2: [ // Burger
      { id: 1, name: "Classic Burger", description: "Hambúrguer, alface, tomate e queijo", price: 28.90, category: "Hambúrgueres" },
      { id: 2, name: "Bacon Burger", description: "Hambúrguer, bacon crocante e queijo cheddar", price: 32.90, category: "Hambúrgueres" },
      { id: 3, name: "Batata Frita", description: "Porção individual", price: 15.90, category: "Acompanhamentos" },
      { id: 4, name: "Milkshake", description: "Sabores variados", price: 18.90, category: "Bebidas" },
    ],
    3: [ // Sushi
      { id: 1, name: "Combinado Sushi", description: "20 peças variadas", price: 68.90, category: "Combinados" },
      { id: 2, name: "Hot Roll Salmão", description: "8 peças empanadas", price: 42.90, category: "Hot Rolls" },
      { id: 3, name: "Sashimi Salmão", description: "10 fatias", price: 48.90, category: "Sashimi" },
      { id: 4, name: "Temaki Skin", description: "Pele de salmão e cream cheese", price: 24.90, category: "Temakis" },
    ],
  };

  return menus[restaurantId] || [
    { id: 1, name: "Prato Principal 1", description: "Descrição deliciosa do prato", price: 35.90, category: "Pratos Principais" },
    { id: 2, name: "Prato Principal 2", description: "Outro prato delicioso", price: 42.90, category: "Pratos Principais" },
    { id: 3, name: "Sobremesa", description: "Doce irresistível", price: 18.90, category: "Sobremesas" },
    { id: 4, name: "Bebida", description: "Refrescante", price: 8.90, category: "Bebidas" },
  ];
};

export function RestaurantView({ restaurant, onBack }: RestaurantViewProps) {
  const menuItems = getMenuItems(restaurant.id);
  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const addToCart = (itemId: number) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return menuItems.reduce((sum, item) => {
      return sum + (item.price * (cart[item.id] || 0));
    }, 0);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-24">
      {/* Header with Image */}
      <div className="relative">
        <ImageWithFallback
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="bg-white px-4 py-4 border-b">
        <h1 className="text-gray-900 mb-1">{restaurant.name}</h1>
        <p className="text-gray-600 mb-3">{restaurant.category}</p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-700">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{restaurant.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Truck className="w-4 h-4" />
            <span>{restaurant.deliveryFee}</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="p-4 space-y-6">
        {categories.map(category => (
          <div key={category}>
            <h2 className="text-gray-900 mb-3">{category}</h2>
            <div className="space-y-3">
              {menuItems
                .filter(item => item.category === category)
                .map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                        <p className="text-purple-600">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>

                    {cart[item.id] ? (
                      <div className="flex items-center justify-end gap-3 mt-3">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-purple-600" />
                        </button>
                        <span className="text-gray-900 min-w-[20px] text-center">
                          {cart[item.id]}
                        </span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item.id)}
                        className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Adicionar
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="max-w-md mx-auto px-4 py-4">
            <button className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                  {getTotalItems()}
                </div>
                <span>Ver carrinho</span>
              </div>
              <span>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
