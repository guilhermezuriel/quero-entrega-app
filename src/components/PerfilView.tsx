import { User, MapPin, CreditCard, Heart, Settings, LogOut, ChevronRight } from 'lucide-react';

type PerfilViewProps = {
  onChangeProfile?: () => void;
};

export function PerfilView({ onChangeProfile }: PerfilViewProps) {
  const menuItems = [
    { icon: MapPin, label: 'Endereços', description: 'Rua das Flores, 123' },
    { icon: CreditCard, label: 'Pagamentos', description: '2 cartões cadastrados' },
    { icon: Heart, label: 'Favoritos', description: '8 restaurantes' },
    { icon: Settings, label: 'Configurações', description: 'Preferências do app' },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-purple-600 px-4 py-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1 text-white">
            <h2>João Silva</h2>
            <p className="text-purple-100 text-sm">joao.silva@email.com</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">{item.label}</p>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="px-4 mt-4">
        <div className="space-y-2">
          <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Sair da conta</span>
          </button>

          {onChangeProfile && (
            <button
              onClick={onChangeProfile}
              className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-700">Mudar perfil</span>
            </button>
          )}
        </div>
      </div>

      {/* App Info */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        <p>Versão 1.0.0</p>
      </div>
    </div>
  );
}
