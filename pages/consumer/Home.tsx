
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Flame, ShoppingBag, MapPin, ChevronRight } from 'lucide-react';

const H5Home: React.FC = () => {
  const categories = [
    { name: '数码', icon: '📱', color: 'bg-blue-100' },
    { name: '服饰', icon: '👕', color: 'bg-purple-100' },
    { name: '生鲜', icon: '🍎', color: 'bg-green-100' },
    { name: '美妆', icon: '💄', color: 'bg-pink-100' },
    { name: '家居', icon: '🏠', color: 'bg-orange-100' },
  ];

  const products = [
    { id: '1', name: '苹果 iPhone 15 Pro', price: 8999, original: 9999, image: 'https://picsum.photos/400/400?random=11', sales: '2.5k' },
    { id: '2', name: '北面冲锋衣 2023新款', price: 1299, original: 1599, image: 'https://picsum.photos/400/400?random=12', sales: '800+' },
    { id: '3', name: '索尼 WH-1000XM5 耳机', price: 2299, original: 2499, image: 'https://picsum.photos/400/400?random=13', sales: '1.2k' },
    { id: '4', name: '九阳破壁机 家用静音', price: 399, original: 599, image: 'https://picsum.photos/400/400?random=14', sales: '3k+' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Search Header */}
      <div className="bg-white px-4 py-3 sticky top-14 z-20">
        <div className="bg-gray-100 rounded-full flex items-center px-4 py-2">
          <Search size={16} className="text-gray-400 mr-2" />
          <input type="text" placeholder="搜索你心仪的商品" className="bg-transparent border-none text-sm w-full focus:outline-none" />
        </div>
      </div>

      {/* Banner */}
      <div className="p-4">
        <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10">
            <h2 className="text-white text-xl font-bold">11.11 预售开启</h2>
            <p className="text-blue-100 text-sm mt-1">定金最高抵 1000 元</p>
            <button className="bg-white text-blue-600 px-4 py-1 rounded-full text-xs font-bold mt-4">立即抢购</button>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 bg-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex justify-between px-4 mt-2">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center text-xl`}>
              {cat.icon}
            </div>
            <span className="text-[11px] text-gray-600 mt-2 font-medium">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Hot Sales Section */}
      <div className="px-4 mt-8">
        <div className="flex justify-between items-end mb-4">
          <div className="flex items-center">
            <div className="bg-red-100 p-1.5 rounded-lg mr-2">
              <Flame size={18} className="text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">热门推荐</h3>
          </div>
          <Link to="/consumer/home" className="text-xs text-blue-600 flex items-center font-medium">查看全部 <ChevronRight size={14} /></Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <Link key={p.id} to={`/consumer/product/${p.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <img src={p.image} className="w-full h-40 object-cover" />
              <div className="p-3">
                <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{p.name}</h4>
                <div className="flex items-baseline mt-1">
                  <span className="text-red-600 font-bold text-lg">￥{p.price}</span>
                  <span className="text-gray-400 text-[10px] line-through ml-2">￥{p.original}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded">火热促销</span>
                  <span className="text-[10px] text-gray-400">已售 {p.sales}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default H5Home;
