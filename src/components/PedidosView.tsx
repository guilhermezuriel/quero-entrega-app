import { Package, Clock, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Order = {
  id: number;
  restaurantName: string;
  restaurantImage: string;
  items: string[];
  total: number;
  status: 'preparing' | 'delivery' | 'completed';
  date: string;
};

const mockOrders: Order[] = [
  {
    id: 1,
    restaurantName: "Pizzaria Bella Napoli",
    restaurantImage: "https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY0MDA0MzYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    items: ["Pizza Margherita", "Refrigerante"],
    total: 51.90,
    status: 'delivery',
    date: 'Hoje, 19:30'
  },
  {
    id: 2,
    restaurantName: "Sushi Bar Sakura",
    restaurantImage: "https://images.unsplash.com/photo-1696449241254-11cf7f18ce32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYzOTI4MjQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    items: ["Combinado Sushi", "Temaki Skin"],
    total: 93.80,
    status: 'completed',
    date: 'Ontem, 20:15'
  },
];

export function PedidosView() {
  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return { icon: Package, text: 'Preparando', color: 'text-orange-500' };
      case 'delivery':
        return { icon: Clock, text: 'Em entrega', color: 'text-blue-500' };
      case 'completed':
        return { icon: CheckCircle, text: 'Entregue', color: 'text-green-500' };
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b sticky top-0 z-10">
        <h1 className="text-gray-900">Meus Pedidos</h1>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {mockOrders.length > 0 ? (
          mockOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  <ImageWithFallback
                    src={order.restaurantImage}
                    alt={order.restaurantName}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{order.restaurantName}</h3>
                    <p className="text-gray-500 text-sm mb-2">
                      {order.items.join(', ')}
                    </p>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                      <span className={`text-sm ${statusInfo.color}`}>
                        {statusInfo.text}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{order.date}</span>
                  <span className="text-gray-900">
                    R$ {order.total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Você ainda não fez nenhum pedido</p>
          </div>
        )}
      </div>
    </div>
  );
}
