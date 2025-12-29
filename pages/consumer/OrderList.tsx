
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingBag, Truck, CheckCircle2, RotateCcw } from 'lucide-react';

const H5OrderList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    {
      id: 'ORDER_20231026_001',
      status: 'shipped',
      statusText: '卖家已发货',
      total: 8999.00,
      items: [{ name: 'iPhone 15 Pro 256G', image: 'https://picsum.photos/200/200?random=11', price: 8999, qty: 1 }],
      supplier: 'Apple官方旗舰店'
    },
    {
      id: 'ORDER_20231025_092',
      status: 'completed',
      statusText: '交易成功',
      total: 1299.00,
      items: [{ name: '北面冲锋衣 2023新款', image: 'https://picsum.photos/200/200?random=12', price: 1299, qty: 1 }],
      supplier: '山系装备社'
    }
  ];

  const tabs = [
    { id: 'all', name: '全部' },
    { id: 'unpaid', name: '待付款' },
    { id: 'shipped', name: '待收货' },
    { id: 'completed', name: '待评价' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Tabs */}
      <div className="bg-white flex justify-around border-b sticky top-14 z-20">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id ? 'text-blue-600 border-blue-600' : 'text-gray-500 border-transparent'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 flex justify-between items-center border-b border-gray-50">
              <div className="flex items-center text-sm font-bold text-gray-800">
                <ShoppingBag size={16} className="mr-2 text-blue-600" />
                {order.supplier}
              </div>
              <span className="text-xs text-blue-600 font-medium">{order.statusText}</span>
            </div>
            
            <div className="p-4 space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex space-x-3">
                  <img src={item.image} className="w-16 h-16 rounded-xl object-cover bg-gray-50" />
                  <div className="flex-1">
                    <h4 className="text-sm text-gray-800 line-clamp-1">{item.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">￥{item.price} x{item.qty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 bg-gray-50/50 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                共{order.items.length}件商品 实付 <span className="text-sm font-bold text-gray-900">￥{order.total.toFixed(2)}</span>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-1.5 border rounded-full text-xs text-gray-600 font-medium">查看物流</button>
                <button className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-medium">确认收货</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default H5OrderList;
