
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, ChevronRight, CreditCard, Wallet, ShieldCheck } from 'lucide-react';

const H5OrderConfirm: React.FC = () => {
  const navigate = useNavigate();
  const [useMileage, setUseMileage] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white px-4 h-14 flex items-center border-b sticky top-0 z-40">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-600"><ChevronLeft /></button>
        <h1 className="text-lg font-bold">填写订单</h1>
      </div>

      {/* Address */}
      <div className="bg-white p-4 flex items-center justify-between border-b-2 border-dashed border-blue-100">
        <div className="flex items-center">
          <div className="bg-blue-50 p-2 rounded-full mr-3 text-blue-600">
            <MapPin size={20} />
          </div>
          <div>
            <div className="font-bold text-gray-900">王小美 138****5678</div>
            <div className="text-xs text-gray-400 mt-0.5">浙江省杭州市西湖区古翠路1号XXX园</div>
          </div>
        </div>
        <ChevronRight size={18} className="text-gray-300" />
      </div>

      {/* Order Items */}
      <div className="mt-2 bg-white p-4">
        <div className="flex items-center mb-4">
          <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center mr-2"><Wallet size={12} /></div>
          <span className="text-sm font-bold">Apple官方旗舰店</span>
        </div>
        <div className="flex space-x-3">
          <img src="https://picsum.photos/200/200?random=11" className="w-20 h-20 rounded-xl object-cover" />
          <div className="flex-1">
            <h4 className="text-sm text-gray-800 line-clamp-2">Apple iPhone 15 Pro 256G 原色钛金属</h4>
            <div className="flex justify-between items-center mt-2">
              <span className="text-red-600 font-bold">￥8999</span>
              <span className="text-xs text-gray-400">x1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deductions */}
      <div className="mt-2 bg-white px-4 divide-y">
        <div className="py-4 flex justify-between items-center">
          <span className="text-sm text-gray-700">优惠券</span>
          <span className="text-sm text-gray-400">无可用优惠券 <ChevronRight size={14} className="inline ml-1" /></span>
        </div>
        <div className="py-4 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-700">里程抵扣</span>
            <div className="text-[10px] text-gray-400 mt-0.5">现有里程 12500，最高可抵 ￥269.97</div>
          </div>
          <div 
            onClick={() => setUseMileage(!useMileage)}
            className={`w-12 h-6 rounded-full transition-colors relative ${useMileage ? 'bg-blue-600' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${useMileage ? 'left-7' : 'left-1'}`}></div>
          </div>
        </div>
      </div>

      {/* Bill */}
      <div className="mt-2 bg-white p-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600"><span>商品金额</span><span>￥8999.00</span></div>
        <div className="flex justify-between text-sm text-gray-600"><span>运费</span><span>￥0.00</span></div>
        {useMileage && <div className="flex justify-between text-sm text-red-600"><span>里程抵扣</span><span>-￥269.97</span></div>}
      </div>

      {/* Payment Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t px-4 py-3 flex items-center justify-between z-50">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase">实付款</span>
          <span className="text-xl font-bold text-red-600">￥{useMileage ? '8729.03' : '8999.00'}</span>
        </div>
        <button className="bg-blue-600 text-white px-10 py-3 rounded-full font-bold shadow-lg shadow-blue-100">提交订单</button>
      </div>
    </div>
  );
};

export default H5OrderConfirm;
