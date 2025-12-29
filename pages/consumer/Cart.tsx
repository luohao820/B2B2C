
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ChevronRight, Check } from 'lucide-react';

const H5Cart: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: '1', name: 'iPhone 15 Pro 256G', price: 8999, qty: 1, selected: true, image: 'https://picsum.photos/200/200?random=11' },
    { id: '2', name: '北面冲锋衣', price: 1299, qty: 1, selected: false, image: 'https://picsum.photos/200/200?random=12' },
  ]);

  const toggleSelect = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const selectedCount = items.filter(i => i.selected).length;
  const totalPrice = items.reduce((sum, i) => i.selected ? sum + (i.price * i.qty) : sum, 0);

  return (
    <div className="bg-gray-50 min-h-screen pb-36">
      <div className="bg-white px-4 py-4 flex justify-between items-center sticky top-14 z-20 border-b">
        <h1 className="text-lg font-bold">购物车 ({items.length})</h1>
        <button className="text-sm text-gray-600">管理</button>
      </div>

      <div className="p-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center shadow-sm">
            <div 
              onClick={() => toggleSelect(item.id)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${
                item.selected ? 'bg-blue-600 border-blue-600' : 'border-gray-200'
              }`}
            >
              {item.selected && <Check size={12} className="text-white" />}
            </div>
            <img src={item.image} className="w-20 h-20 rounded-xl object-cover" />
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
              <div className="text-xs text-gray-400 mt-1">规格: 默认</div>
              <div className="flex justify-between items-end mt-2">
                <span className="text-red-600 font-bold">￥{item.price}</span>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button className="p-1 hover:bg-gray-100"><Minus size={14} /></button>
                  <span className="px-3 text-sm font-medium">{item.qty}</span>
                  <button className="p-1 hover:bg-gray-100"><Plus size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto bg-white border-t px-4 py-3 flex items-center justify-between z-40">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full border-2 border-gray-200 mr-2"></div>
          <span className="text-sm text-gray-500">全选</span>
        </div>
        <div className="flex items-center">
          <div className="text-right mr-4">
            <div className="text-xs text-gray-400">已选 {selectedCount} 件</div>
            <div className="text-sm font-bold text-red-600">合计: ￥{totalPrice.toLocaleString()}</div>
          </div>
          <button 
            disabled={selectedCount === 0}
            onClick={() => navigate('/consumer/order-confirm')}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-opacity ${
              selectedCount > 0 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-white cursor-not-allowed'
            }`}
          >
            结算
          </button>
        </div>
      </div>
    </div>
  );
};

export default H5Cart;
