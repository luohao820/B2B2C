
import React, { useState } from 'react';
import { MapPin, Plus, Edit3, Trash2, CheckCircle, X, ShieldCheck, ShoppingBag, Search, LayoutGrid, Tag } from 'lucide-react';

const ReturnAddress: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [scopeType, setScopeType] = useState<'all' | 'specific'>('all');
  const [inputProductId, setInputProductId] = useState('');

  const [addresses, setAddresses] = useState([
    {
      id: 'ADDR_001',
      recipient: '张三 (主仓库)',
      phone: '13812345678',
      region: '浙江省 杭州市 西湖区',
      detail: '古翠路1号XXX电商园3号楼201',
      is_default: true,
      applicable_scope: 'all',
      products: []
    },
    {
      id: 'ADDR_002',
      recipient: '李四 (大件组)',
      phone: '13987654321',
      region: '上海市 浦东新区',
      detail: '张江高科技园区XXX路88号',
      is_default: false,
      applicable_scope: 'specific',
      products: ['PROD_S_005', 'PROD_S_006']
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">退货仓储管理</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl flex items-center hover:bg-blue-700 transition shadow-lg shadow-blue-100 font-black uppercase text-xs"
        >
          <Plus size={20} className="mr-2" /> 新增退货接收点
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in duration-200 flex flex-col max-h-[85vh]">
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                 <h3 className="text-lg font-bold">维护退货收货地址</h3>
                 <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              <div className="p-8 space-y-6 overflow-y-auto">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">收货人姓名</label>
                       <input type="text" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="姓名" />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">联系电话</label>
                       <input type="tel" className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="11位手机号" />
                    </div>
                    <div className="col-span-2">
                       <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">所在地区</label>
                       <div className="grid grid-cols-3 gap-3">
                          <select className="border rounded-xl p-3 outline-none text-sm bg-white"><option>浙江省</option></select>
                          <select className="border rounded-xl p-3 outline-none text-sm bg-white"><option>杭州市</option></select>
                          <select className="border rounded-xl p-3 outline-none text-sm bg-white"><option>西湖区</option></select>
                       </div>
                    </div>
                    <div className="col-span-2">
                       <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-widest">详细街道地址</label>
                       <textarea className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 h-20 text-sm" placeholder="路名、门牌号、房号等"></textarea>
                    </div>

                    {/* 补齐 2.5：精细化商品适用配置 */}
                    <div className="col-span-2 space-y-3 pt-4 border-t">
                       <label className="text-[10px] font-black text-blue-600 block mb-1 uppercase tracking-widest flex items-center">
                          <LayoutGrid size={14} className="mr-2" /> 适用商品范围配置 (Precise Mapping)
                       </label>
                       <div className="flex items-center space-x-6">
                          <label className="flex items-center text-xs font-medium cursor-pointer">
                            <input type="radio" name="scope" className="mr-2" checked={scopeType === 'all'} onChange={() => setScopeType('all')} /> 全部商品
                          </label>
                          <label className="flex items-center text-xs font-medium cursor-pointer">
                            <input type="radio" name="scope" className="mr-2" checked={scopeType === 'specific'} onChange={() => setScopeType('specific')} /> 指定特定商品
                          </label>
                       </div>
                       
                       {scopeType === 'specific' && (
                         <div className="bg-gray-50 p-4 rounded-2xl space-y-4 animate-in slide-in-from-top-2 duration-300">
                            <div className="flex space-x-2">
                               <input 
                                 value={inputProductId}
                                 onChange={(e) => setInputProductId(e.target.value)}
                                 type="text" 
                                 className="flex-1 border rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500" 
                                 placeholder="输入商品唯一 ID (如 PROD_S_001)" 
                               />
                               <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-sm">+ 添加</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                               {['PROD_S_005', 'PROD_S_006'].map(pid => (
                                 <span key={pid} className="bg-white border px-3 py-1 rounded-full text-[10px] font-bold text-gray-600 flex items-center shadow-xs">
                                    <Tag size={10} className="mr-1.5 text-blue-400" /> {pid}
                                    <X size={12} className="ml-2 text-red-400 cursor-pointer hover:text-red-600" />
                                 </span>
                               ))}
                            </div>
                         </div>
                       )}
                    </div>
                 </div>
              </div>
              <div className="p-6 border-t bg-gray-50 flex space-x-3 shadow-inner">
                 <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white border rounded-2xl font-bold text-gray-600 hover:bg-gray-100 transition">取消</button>
                 <button className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition">保存接收地址配置</button>
              </div>
           </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {addresses.map((addr) => (
          <div key={addr.id} className={`group bg-white p-8 rounded-[32px] border-2 transition-all relative overflow-hidden ${addr.is_default ? 'border-blue-500 shadow-xl shadow-blue-50' : 'border-transparent shadow-sm'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-2xl ${addr.is_default ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}>
                  <MapPin size={24} />
                </div>
                {addr.is_default && <span className="ml-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-200">DEFAULT</span>}
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setShowModal(true)} className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-baseline space-x-3">
                <span className="text-xl font-black text-gray-900 italic">{addr.recipient}</span>
                <span className="text-sm text-gray-400 font-mono font-bold tracking-tighter">{addr.phone}</span>
              </div>
              <div className="text-sm text-gray-500 font-medium italic leading-relaxed">"{addr.region} {addr.detail}"</div>
              <div className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest">ID: {addr.id}</div>
            </div>

            <div className="mt-8 pt-6 border-t border-dashed flex flex-col space-y-4">
               <div className="flex items-center text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50/50 p-2.5 rounded-xl border border-blue-50">
                  <ShoppingBag size={12} className="mr-2" /> 
                  适用商品：{addr.applicable_scope === 'all' ? '全部上架商品 (GLOBAL)' : `指定 ${addr.products.length} 款商品`}
               </div>
               {addr.applicable_scope === 'specific' && (
                 <div className="flex flex-wrap gap-1">
                    {addr.products.map(p => <span key={p} className="text-[8px] bg-gray-50 border px-1.5 py-0.5 rounded font-mono text-gray-500">{p}</span>)}
                 </div>
               )}
            </div>

            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:rotate-12 transition-transform">
               <ShieldCheck size={120} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReturnAddress;
