import { Home, ClipboardList, Sparkles, User } from 'lucide-react';

type BottomBarProps = {
  currentView: 'home' | 'pedidos' | 'surprise' | 'perfil';
  onNavigate: (view: 'home' | 'pedidos' | 'surprise' | 'perfil') => void;
};

export function BottomBar({ currentView, onNavigate }: BottomBarProps) {
  const items = [
    { id: 'home' as const, label: 'Início', icon: Home },
    { id: 'pedidos' as const, label: 'Pedidos', icon: ClipboardList },
    { id: 'surprise' as const, label: 'Surpresa', icon: Sparkles },
    { id: 'perfil' as const, label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-30">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
            >
              <Icon 
                className={`w-6 h-6 ${
                  isActive ? 'text-purple-600' : 'text-gray-400'
                }`}
              />
              <span 
                className={`text-xs ${
                  isActive ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
