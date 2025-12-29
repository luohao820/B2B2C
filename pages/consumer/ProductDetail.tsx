
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Heart, ShoppingCart, ShieldCheck, ChevronRight, MessageSquare, Store } from 'lucide-react';

const H5ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSpec, setSelectedSpec] = useState('256G');
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="fixed top-0 left-0 right-0 max-w-md mx-auto h-14 px-4 flex justify-between items-center z-40">
        <button onClick={() => navigate(-1)} className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white backdrop-blur-md">
          <ChevronLeft size={20} />
        </button>
        <div className="flex space-x-2">
          <button className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-white backdrop-blur-md">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="aspect-square bg-white overflow-hidden">
        <img src={`https://picsum.photos/800/800?random=${id}`} className="w-full h-full object-cover" />
      </div>

      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-red-600">￥8999</span>
            <span className="text-xs text-gray-400 line-through ml-2">￥9999</span>
          </div>
          <div className="text-xs text-gray-400">月销 2500+</div>
        </div>
        <h1 className="text-lg font-bold text-gray-900 leading-snug">Apple iPhone 15 Pro (A3102) 256GB 原色钛金属 支持移动联通电信5G手机</h1>
        <div className="flex items-center space-x-2 mt-3">
          <span className="bg-red-50 text-red-600 text-[10px] px-1.5 py-0.5 rounded font-bold">11.11 预售</span>
          <span className="bg-orange-50 text-orange-600 text-[10px] px-1.5 py-0.5 rounded font-bold">里程抵扣 30%</span>
        </div>
      </div>

      <div className="mt-2 bg-white px-4 py-4 space-y-4">
        <div className="flex justify-between items-center group cursor-pointer">
          <div className="flex">
            <span className="text-sm text-gray-400 w-12 flex-shrink-0">选择</span>
            <span className="text-sm text-gray-900 font-medium">原色钛金属，{selectedSpec}，1件</span>
          </div>
          <ChevronRight size={16} className="text-gray-300" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex">
            <span className="text-sm text-gray-400 w-12 flex-shrink-0">保障</span>
            <span className="text-sm text-gray-900 flex items-center">
              <ShieldCheck size={14} className="text-green-500 mr-1" /> 7天无理由退货 · 正品保障
            </span>
          </div>
          <ChevronRight size={16} className="text-gray-300" />
        </div>
      </div>

      <div className="mt-2 bg-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-blue-600">
            <Store size={24} />
          </div>
          <div className="ml-3">
            <div className="text-sm font-bold">Apple官方旗舰店</div>
            <div className="text-[10px] text-gray-400">综合评分 4.9 · 品牌官方认证</div>
          </div>
        </div>
        <button className="border border-blue-600 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">进店逛逛</button>
      </div>

      <div className="mt-2 bg-white p-4">
        <div className="text-sm font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-2">商品详情</div>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            iPhone 15 Pro 采用航空级钛金属打造，既坚固又轻盈。
          </p>
          <img src="https://picsum.photos/800/1200?random=101" className="w-full rounded-xl" />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-4 h-20 flex items-center justify-between z-50">
        <div className="flex space-x-6 mr-4">
          <div className="flex flex-col items-center">
            <MessageSquare size={20} className="text-gray-600" />
            <span className="text-[10px] text-gray-500 mt-1">客服</span>
          </div>
          <div className="flex flex-col items-center" onClick={() => setIsFavorite(!isFavorite)}>
            <Heart size={20} className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'} />
            <span className="text-[10px] text-gray-500 mt-1">{isFavorite ? '已收藏' : '收藏'}</span>
          </div>
        </div>
        <div className="flex-1 flex space-x-2">
          <button className="flex-1 bg-orange-500 text-white font-bold py-3 rounded-full text-sm">加入购物车</button>
          <button onClick={() => navigate('/consumer/order-confirm')} className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-full text-sm">立即购买</button>
        </div>
      </div>
    </div>
  );
};

export default H5ProductDetail;
