
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, MapPin, Edit2, Trash2 } from 'lucide-react';

const H5AddressList: React.FC = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: '王小美',
      phone: '138****5678',
      region: '浙江省 杭州市 西湖区',
      detail: '古翠路1号XXX园3号楼201',
      isDefault: true
    },
    {
      id: '2',
      name: '李大壮',
      phone: '139****1122',
      region: '上海市 浦东新区',
      detail: '张江高科技园区XXX路88号',
      isDefault: false
    }
  ]);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* 顶部导航 */}
      <div className="bg-white px-4 h-14 flex items-center border-b sticky top-0 z-40">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-600 active:scale-95 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">我的收货地址</h1>
      </div>

      {/* 地址列表 */}
      <div className="p-4 space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white p-4 rounded-2xl shadow-sm border border-transparent hover:border-blue-100 transition-all">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <span className="font-bold text-gray-900 text-base">{addr.name}</span>
                <span className="ml-3 text-sm text-gray-500 font-medium">{addr.phone}</span>
                {addr.isDefault && (
                  <span className="ml-3 bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-bold">默认</span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-600 mb-4 leading-relaxed">
              {addr.region} {addr.detail}
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-50">
              <div className="flex items-center text-xs text-gray-400">
                <MapPin size={12} className="mr-1" />
                收货地址
              </div>
              <div className="flex space-x-4">
                <button className="flex items-center text-xs text-gray-500 hover:text-blue-600 transition-colors py-1 px-2">
                  <Edit2 size={14} className="mr-1" /> 编辑
                </button>
                <button className="flex items-center text-xs text-gray-500 hover:text-red-600 transition-colors py-1 px-2">
                  <Trash2 size={14} className="mr-1" /> 删除
                </button>
              </div>
            </div>
          </div>
        ))}

        {addresses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <MapPin size={48} className="mb-4 opacity-20" />
            <p className="text-sm">暂无收货地址</p>
          </div>
        )}
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-40">
        <button className="w-full bg-blue-600 text-white py-3.5 rounded-full font-bold shadow-lg shadow-blue-100 flex items-center justify-center hover:bg-blue-700 transition-all active:scale-95">
          <Plus size={20} className="mr-2" /> 新增收货地址
        </button>
      </div>
    </div>
  );
};

export default H5AddressList;
