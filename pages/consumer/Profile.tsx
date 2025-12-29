
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Added MessageSquare to the imports from lucide-react
import { Settings, Bell, Wallet, Clock, Package, CheckCircle, RotateCcw, ChevronRight, User, Star, CreditCard, MessageSquare } from 'lucide-react';

const H5Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 px-6 pt-12 pb-16 rounded-b-[40px] relative">
        <div className="flex justify-end space-x-4 text-white/80 mb-6">
          <Settings size={22} />
          <Bell size={22} />
        </div>
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-blue-600 overflow-hidden">
              <User size={32} />
            </div>
          </div>
          <div className="ml-4 text-white">
            <h2 className="text-xl font-bold">王小美</h2>
            <div className="flex items-center mt-1">
              <span className="bg-black/20 text-[10px] px-2 py-0.5 rounded-full backdrop-blur-md">黄金会员 VIP 3</span>
              <span className="ml-2 text-[10px] opacity-70">138****5678</span>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-10 left-6 right-6 bg-white rounded-2xl shadow-xl flex justify-around p-4">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">12,500</div>
            <div className="text-[10px] text-gray-400 mt-0.5">里程积分</div>
          </div>
          <div className="w-[1px] bg-gray-100"></div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">12</div>
            <div className="text-[10px] text-gray-400 mt-0.5">优惠券</div>
          </div>
          <div className="w-[1px] bg-gray-100"></div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">￥420.00</div>
            <div className="text-[10px] text-gray-400 mt-0.5">余额</div>
          </div>
        </div>
      </div>

      <div className="mt-16 px-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">我的订单</h3>
            <button className="text-[10px] text-gray-400 flex items-center">全部订单 <ChevronRight size={12} /></button>
          </div>
          <div className="flex justify-between">
            {[
              { icon: Wallet, label: '待付款', count: 2 },
              { icon: Clock, label: '待发货', count: 0 },
              { icon: Package, label: '待收货', count: 3 },
              { icon: Star, label: '评价', count: 0 },
              { icon: RotateCcw, label: '售后', count: 1 },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center relative">
                  <Icon size={22} className="text-gray-600" />
                  <span className="text-[10px] text-gray-500 mt-2">{item.label}</span>
                  {item.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                      {item.count}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 px-6 mb-10">
        <div className="bg-white rounded-2xl p-2 shadow-sm divide-y">
          {[
            { label: '收货地址管理', icon: Clock },
            { label: '领券中心', icon: Star },
            { label: '帮助与客服', icon: MessageSquare },
            { label: '邀请有礼', icon: User },
            { label: '设置', icon: Settings },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <span className="text-gray-400 mr-3"><s.icon size={18} /></span>
                <span className="text-sm text-gray-700">{s.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default H5Profile;
